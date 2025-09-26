import { Injectable } from "@nestjs/common";
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductRespository {
    Products: Array<Product> = [
  {
    id: 1,
    name: "Laptop Gamer",
    description: "Laptop con procesador Intel i7, 16GB RAM y GPU RTX 3060.",
    price: 1499.99,
    stock: true,
    imgUrl: "https://example.com/images/laptop-gamer.jpg",
  },
  {
    id: 2,
    name: "Auriculares Bluetooth",
    description: "Auriculares inalámbricos con cancelación de ruido.",
    price: 199.99,
    stock: true,
    imgUrl: "https://example.com/images/auriculares.jpg",
  },
  {
    id: 3,
    name: "Smartphone 5G",
    description: "Teléfono inteligente con pantalla AMOLED de 6.5 pulgadas.",
    price: 899.99,
    stock: false,
    imgUrl: "https://example.com/images/smartphone.jpg",
  },
  {
    id: 4,
    name: "Teclado Mecánico",
    description: "Teclado mecánico RGB con switches red.",
    price: 120.0,
    stock: true,
    imgUrl: "https://example.com/images/teclado.jpg",
  },
  {
    id: 5,
    name: "Silla Ergonómica",
    description: "Silla de oficina ergonómica con soporte lumbar.",
    price: 350.5,
    stock: true,
    imgUrl: "https://example.com/images/silla.jpg",
  },
  {
    id: 6,
    name: "Monitor 27'' 4K",
    description: "Monitor de 27 pulgadas con resolución 4K UHD.",
    price: 420.99,
    stock: false,
    imgUrl: "https://example.com/images/monitor.jpg",
  },
  {
    id: 7,
    name: "Mouse Inalámbrico",
    description: "Mouse ergonómico con conexión Bluetooth.",
    price: 45.0,
    stock: true,
    imgUrl: "https://example.com/images/mouse.jpg",
  },
  {
    id: 8,
    name: "Disco SSD 1TB",
    description: "Unidad de estado sólido NVMe de 1TB.",
    price: 130.75,
    stock: true,
    imgUrl: "https://example.com/images/ssd.jpg",
  },
  {
    id: 9,
    name: "Tablet 10''",
    description: "Tablet de 10 pulgadas con Android 13.",
    price: 280.0,
    stock: true,
    imgUrl: "https://example.com/images/tablet.jpg",
  },
  {
    id: 10,
    name: "Cámara DSLR",
    description: "Cámara réflex digital con lente 18-55mm.",
    price: 699.99,
    stock: false,
    imgUrl: "https://example.com/images/camara.jpg",
  },
    ]

    async find() {
        return this.Products
    }
}