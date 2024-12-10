import React, { useEffect, useState } from "react";
import { Table, Button, Select, InputNumber, Space, message, Card } from "antd";
import moment from "moment";
import axios from "axios";
import { getUser } from "../types/Usuario";
import { useAuth } from "../hooks/useAuth";

interface Producto {
    idProducto: number;
    nombre: string;
    precio: number;
    stock: number;
}

interface CartItem {
    idProducto: number;
    nombre: string;
    precio: number;
    cantidad: number;
    subtotal: number;
}

interface VentaRequest {
    fechaVenta: string;
    metodoPago: string;
    total: number;
}

const VentasTable: React.FC = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
    const [cantidad, setCantidad] = useState<number>(1);
    const [isLoading, setIsLoading] = useState(false);
    const [total, setTotal] = useState<number>(0);
    const [metodoPago, setMetodoPago] = useState<string>("EFECTIVO");
    const [availableStock, setAvailableStock] = useState<Record<number, number>>({});

    const metodoPagoOptions = [
        { value: "EFECTIVO", label: "Efectivo" },
        { value: "TARJETA", label: "Tarjeta" },
        { value: "YAPE", label: "Yape" },
        { value: "PLIN", label: "Plin" }
    ];

    const { checkAuth } = useAuth();
    
    const getAuthHeader = () => {
        const user = getUser();
        return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        setIsLoading(true);
        try {
            const { data } = await checkAuth(axios.get<Producto[]>("/api/productos", {
                headers: getAuthHeader()
            }));
            setProductos(data);
        } catch (error) {
            message.error("Error al cargar los productos");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const newTotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
        setTotal(newTotal);
    }, [cartItems]);

    useEffect(() => {
        const newAvailableStock: Record<number, number> = {};
        productos.forEach(p => {
            const cartItem = cartItems.find(item => item.idProducto === p.idProducto);
            newAvailableStock[p.idProducto] = p.stock - (cartItem?.cantidad || 0);
        });
        setAvailableStock(newAvailableStock);
    }, [productos, cartItems]);

    const handleProductChange = (value: number) => {
        setSelectedProduct(value);
        const maxAvailable = availableStock[value] || 0;
        setCantidad(maxAvailable > 0 ? 1 : 0);
    };

    const handleQuantityChange = (value: number | null) => {
        if (value !== null) {
            setCantidad(value);
        }
    };

    const addToCart = () => {
        if (!selectedProduct) {
            message.warning("Por favor seleccione un producto");
            return;
        }

        const product = productos.find(p => p.idProducto === selectedProduct);
        if (!product) return;

        const available = availableStock[selectedProduct];
        if (available < cantidad) {
            message.error(`Solo hay ${available} unidades disponibles`);
            return;
        }

        const existingItem = cartItems.find(item => item.idProducto === selectedProduct);
        if (existingItem) {
            const newQuantity = existingItem.cantidad + cantidad;
            if (newQuantity > product.stock) {
                message.error("La cantidad total excede el stock disponible");
                return;
            }

            setCartItems(cartItems.map(item =>
                item.idProducto === selectedProduct
                    ? { ...item, cantidad: newQuantity, subtotal: product.precio * newQuantity }
                    : item
            ));
        } else {
            setCartItems([...cartItems, {
                idProducto: product.idProducto,
                nombre: product.nombre,
                precio: product.precio,
                cantidad: cantidad,
                subtotal: product.precio * cantidad
            }]);
        }

        setSelectedProduct(null);
        setCantidad(1);
        message.success("Producto añadido al carrito");
    };

    const removeFromCart = (idProducto: number) => {
        setCartItems(cartItems.filter(item => item.idProducto !== idProducto));
    };

    const handleGenerateVenta = async () => {
        if (cartItems.length === 0) {
            message.warning("El carrito está vacío");
            return;
        }

        // Validate stock levels before proceeding
        for (const item of cartItems) {
            const currentStock = availableStock[item.idProducto];
            if (currentStock < item.cantidad) {
                message.error(`Stock insuficiente para ${item.nombre}. Stock disponible: ${currentStock}`);
                return;
            }
        }

        setIsLoading(true);
        try {
            // 1. Create sale
            const ventaData = {
                fechaVenta: moment().format('YYYY-MM-DDTHH:mm:ss'),
                metodoPago: metodoPago,
                total: total
            };

            const ventaResponse = await checkAuth(axios.post("/api/ventas", ventaData, {
                headers: getAuthHeader()
            }));

            const idVenta = ventaResponse.data.idVenta;

            // 2. Create sale details without modifying stock
            const detallesPromises = cartItems.map(item => {
                const detalleData = {
                    venta: {
                        idVenta: idVenta,
                        fechaVenta: moment().format('YYYY-MM-DDTHH:mm:ss'),
                        total: total,
                        metodoPago: metodoPago
                    },
                    producto: {
                        idProducto: item.idProducto,
                        nombre: item.nombre,
                        precio: item.precio
                    },
                    cantidad: item.cantidad,
                    precioUnitario: item.precio,
                    subtotal: item.subtotal
                };

                return checkAuth(axios.post("/api/detalleventas", detalleData, {
                    headers: getAuthHeader()
                }));
            });

            await Promise.all(detallesPromises);

            // 3. Update products stock correctly
            const updateStockPromises = cartItems.map(item => {
                const currentProduct = productos.find(p => p.idProducto === item.idProducto);
                if (!currentProduct) return Promise.resolve();

                const newStock = currentProduct.stock - item.cantidad; // Direct reduction
                
                const updatedProduct = {
                    ...currentProduct,
                    stock: newStock
                };

                return checkAuth(axios.put(`/api/productos/${item.idProducto}`, updatedProduct, {
                    headers: getAuthHeader()
                }));
            });

            await Promise.all(updateStockPromises);

            message.success("Venta generada con éxito");
            setCartItems([]);
            setMetodoPago("EFECTIVO");
            
            // 4. Refresh products list
            fetchProductos();
        } catch (error) {
            message.error("Error al generar la venta");
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const cartColumns = [
        { title: "Producto", dataIndex: "nombre", key: "nombre" },
        { title: "Precio Unitario", dataIndex: "precio", key: "precio", 
          render: (precio: number) => `S/${precio.toFixed(2)}` },
        { title: "Cantidad", dataIndex: "cantidad", key: "cantidad" },
        { title: "Subtotal", dataIndex: "subtotal", key: "subtotal",
          render: (subtotal: number) => `S/${subtotal.toFixed(2)}` },
        {
            title: "Acciones",
            key: "acciones",
            render: (record: CartItem) => (
                <Button onClick={() => removeFromCart(record.idProducto)} type="link" danger>
                    Eliminar
                </Button>
            )
        }
    ];

    return (
        <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Card title="Agregar Producto">
                <Space>
                    <Select
                        style={{ width: 300 }}
                        placeholder="Seleccionar producto"
                        value={selectedProduct}
                        onChange={handleProductChange}
                        options={productos
                            .filter(p => availableStock[p.idProducto] > 0)
                            .map(p => ({
                                value: p.idProducto,
                                label: `${p.nombre} (Stock disponible: ${availableStock[p.idProducto]})`
                            }))}
                    />
                    <InputNumber
                        min={1}
                        max={selectedProduct ? availableStock[selectedProduct] : 1}
                        value={cantidad}
                        onChange={handleQuantityChange}
                        disabled={!selectedProduct || availableStock[selectedProduct] < 1}
                    />
                    <Button type="primary" onClick={addToCart}>
                        Añadir al Carrito
                    </Button>
                </Space>
            </Card>

            <Card 
                title="Carrito de Compras" 
                extra={
                    <Space>
                        <Select
                            value={metodoPago}
                            onChange={setMetodoPago}
                            options={metodoPagoOptions}
                            style={{ width: 120 }}
                        />
                        <strong>Total: S/{total.toFixed(2)}</strong>
                        <Button 
                            type="primary" 
                            onClick={handleGenerateVenta}
                            loading={isLoading}
                        >
                            Generar Venta
                        </Button>
                    </Space>
                }
            >
                <Table
                    columns={cartColumns}
                    dataSource={cartItems}
                    rowKey="idProducto"
                    pagination={false}
                    loading={isLoading}
                />
            </Card>
        </Space>
    );
};

export default VentasTable;