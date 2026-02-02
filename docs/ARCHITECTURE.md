# Vidalib - Arquitectura de la Aplicacion

## Resumen Ejecutivo

Vidalib es una tienda e-commerce de productos ortopedicos y de movilidad con **SEO programatico masivo** que genera automaticamente ~1 millon de URLs indexables en **32 idiomas** para **300+ ciudades** del mundo.

---

## Estructura del Proyecto

\`\`\`
vidalib/
├── app/
│   ├── [locale]/           # Rutas por idioma (32 idiomas)
│   │   ├── page.tsx        # Homepage traducida
│   │   ├── [...slug]/      # Paginas SEO dinamicas (millones)
│   │   ├── about/          # Sobre nosotros
│   │   └── contact/        # Contacto
│   ├── sitemaps/           # Sitemaps XML
│   │   ├── [slug]/         # Sitemap por idioma
│   │   └── pages.xml/      # Sitemap de paginas estaticas
│   ├── robots.txt/         # Robots.txt dinamico
│   └── sitemap.xml/        # Sitemap index principal
├── components/
│   ├── store/              # Componentes de tienda
│   │   ├── header.tsx      # Navegacion con selector idioma
│   │   ├── hero.tsx        # Banner principal
│   │   ├── features.tsx    # Caracteristicas (envio, garantia)
│   │   ├── categories.tsx  # Grid de categorias
│   │   ├── footer.tsx      # Pie de pagina
│   │   ├── cta.tsx         # Call to action
│   │   ├── local-seo.tsx   # Links internos SEO
│   │   ├── shopify-products.tsx    # Grid productos
│   │   └── shopify-product-card.tsx # Tarjeta producto
│   ├── cart/               # Sistema de carrito
│   │   ├── cart-context.tsx    # Estado global carrito
│   │   ├── cart-drawer.tsx     # Drawer lateral
│   │   └── add-to-cart.tsx     # Boton anadir
│   └── ui/                 # Componentes UI (shadcn)
├── lib/
│   ├── seo-data.ts         # ~3000 lineas de traducciones SEO
│   ├── seo-lite.ts         # Traducciones ligeras para runtime
│   └── shopify/            # Integracion Shopify
│       ├── index.ts        # Cliente GraphQL
│       ├── types.ts        # Tipos TypeScript
│       └── utils.ts        # Utilidades
└── public/
    ├── og-image.jpg        # Imagen Open Graph
    ├── manifest.json       # PWA manifest
    └── icons/              # Favicons
\`\`\`

---

## Escala de la Aplicacion

| Metrica | Cantidad |
|---------|----------|
| **Idiomas soportados** | 32 |
| **Categorias de productos** | 10 |
| **Ciudades indexadas** | 300+ |
| **Intents de busqueda** | 20 por idioma |
| **URLs generadas en sitemap** | ~1,000,000+ |
| **Paises cubiertos** | 50+ |

---

## Idiomas Soportados (32)

### Europa Occidental
| Codigo | Idioma | Paises |
|--------|--------|--------|
| `es` | Espanol | Espana, Mexico, Argentina, Colombia, Chile, Peru |
| `en` | Ingles | USA, UK, Canada, Australia, Irlanda |
| `de` | Aleman | Alemania, Austria, Suiza |
| `fr` | Frances | Francia, Belgica, Suiza, Canada |
| `it` | Italiano | Italia, Suiza |
| `pt` | Portugues | Portugal, Brasil |
| `nl` | Holandes | Paises Bajos, Belgica |

### Europa del Norte
| Codigo | Idioma | Paises |
|--------|--------|--------|
| `sv` | Sueco | Suecia |
| `da` | Danes | Dinamarca |
| `no` | Noruego | Noruega |
| `fi` | Finlandes | Finlandia |

### Europa Central
| Codigo | Idioma | Paises |
|--------|--------|--------|
| `pl` | Polaco | Polonia |
| `cs` | Checo | Republica Checa |
| `hu` | Hungaro | Hungria |
| `sk` | Eslovaco | Eslovaquia |

### Europa del Sur
| Codigo | Idioma | Paises |
|--------|--------|--------|
| `el` | Griego | Grecia |
| `tr` | Turco | Turquia |
| `ro` | Rumano | Rumania |

### Balcanes
| Codigo | Idioma | Paises |
|--------|--------|--------|
| `hr` | Croata | Croacia |
| `sl` | Esloveno | Eslovenia |
| `bg` | Bulgaro | Bulgaria |

### Paises Balticos
| Codigo | Idioma | Paises |
|--------|--------|--------|
| `et` | Estonio | Estonia |
| `lv` | Leton | Letonia |
| `lt` | Lituano | Lituania |

### Otros UE
| Codigo | Idioma | Paises |
|--------|--------|--------|
| `mt` | Maltes | Malta |
| `ga` | Irlandes/Gaelico | Irlanda |

### Europa del Este
| Codigo | Idioma | Paises |
|--------|--------|--------|
| `ru` | Ruso | Rusia |
| `uk` | Ucraniano | Ucrania |

### Asia
| Codigo | Idioma | Paises |
|--------|--------|--------|
| `zh` | Chino | China, Taiwan, Hong Kong, Singapur |
| `ja` | Japones | Japon |
| `ko` | Coreano | Corea del Sur |

### Medio Oriente
| Codigo | Idioma | Paises |
|--------|--------|--------|
| `ar` | Arabe | Arabia Saudita, EAU, Egipto, Marruecos |

---

## Categorias de Productos (10)

| Slug | Categoria | Descripcion |
|------|-----------|-------------|
| `wheelchairs` | Sillas de Ruedas | Manuales, electricas, transporte, reclinables |
| `walkers` | Andadores | Rollators, plegables, de rodilla, bariatricos |
| `canes` | Bastones | Standard, quad, plegables, ergonomicos |
| `bathroom-safety` | Seguridad Bano | Sillas ducha, barras, elevadores WC |
| `beds` | Camas Articuladas | Hospitalarias, ajustables, colchones |
| `cushions` | Cojines Antiescaras | Gel, espuma, aire, posicionamiento |
| `ramps` | Rampas Accesibilidad | Portatiles, plegables, modulares |
| `lift-chairs` | Sillones Elevadores | 2 posiciones, 3 posiciones, zero-gravity |
| `scooters` | Scooters Electricos | Viaje, plegables, todo terreno |
| `accessories` | Accesorios Movilidad | Portavasos, bolsas, bandejas |

---

## Sistema SEO Programatico

### Patron de URLs

La app genera automaticamente URLs optimizadas para SEO local:

\`\`\`
/{locale}/{intent}-{categoria}-en-{ciudad}
\`\`\`

### Ejemplos por Idioma

\`\`\`
ESPANOL:
/es/comprar-sillas-de-ruedas-en-madrid
/es/alquilar-andadores-en-barcelona

INGLES:
/en/buy-wheelchairs-in-london
/en/rent-walkers-in-new-york

ALEMAN:
/de/kaufen-rollstuhle-in-berlin
/de/mieten-gehhilfen-in-munchen

FRANCES:
/fr/acheter-fauteuils-roulants-a-paris
/fr/louer-deambulateurs-a-lyon

ARABE:
/ar/شراء-كراسي-متحركة-في-الرياض
/ar/استئجار-مشايات-في-دبي

CHINO:
/zh/购买-轮椅-在-上海
/zh/租赁-助行器-在-北京

RUSO:
/ru/купить-инвалидные-коляски-в-москва
/ru/аренда-ходунки-в-санкт-петербург
\`\`\`

### Calculo de URLs Totales

\`\`\`
32 idiomas x 10 categorias x 300 ciudades x 20 intents
= ~1,920,000 URLs potenciales
\`\`\`

---

## Intents de Busqueda (20 por idioma)

| Intent (ES) | Intent (EN) | Intent (DE) | Tipo |
|-------------|-------------|-------------|------|
| comprar | buy | kaufen | Transaccional |
| alquilar | rent | mieten | Transaccional |
| precio | price | preis | Comercial |
| barato | cheap | gunstig | Comercial |
| mejor | best | beste | Comercial |
| premium | premium | premium | Comercial |
| cerca-de-mi | near-me | in-meiner-nahe | Local |
| online | online | online | Transaccional |
| envio-gratis | free-shipping | kostenloser-versand | Comercial |
| oferta | sale | angebot | Comercial |

---

## Flujo del Usuario

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│  1. Usuario busca en Google                                 │
│     "comprar silla de ruedas en Barcelona"                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  2. Google muestra resultado de Vidalib                     │
│     vidalib.com/es/comprar-sillas-de-ruedas-en-barcelona   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  3. Usuario llega a pagina optimizada                       │
│     - Titulo: "Comprar Sillas de Ruedas en Barcelona"       │
│     - Productos filtrados de Shopify                        │
│     - Contenido en espanol                                  │
│     - Schema.org para rich snippets                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  4. Usuario anade producto al carrito                       │
│     - Carrito sincronizado con Shopify                      │
│     - Drawer lateral con resumen                            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  5. Checkout en Shopify                                     │
│     - Pago seguro                                           │
│     - Envio calculado                                       │
│     - Confirmacion de pedido                                │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

## Integraciones

| Servicio | Funcion | Configuracion |
|----------|---------|---------------|
| **Shopify** | Productos, inventario, checkout, pagos | `SHOPIFY_STOREFRONT_ACCESS_TOKEN`, `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` |
| **Intercom** | Chat de soporte 24/7 | `NEXT_PUBLIC_INTERCOM_APP_ID` |
| **Google Search Console** | Indexacion via sitemaps | Verificacion en `layout.tsx` |

---

## Metadata y SEO

### Cada pagina incluye:

- **Title** - Dinamico y traducido al idioma
- **Description** - Optimizada con keywords
- **Open Graph** - Imagen, titulo, descripcion para redes
- **Twitter Card** - Summary large image
- **Canonical URL** - Evita contenido duplicado
- **Hreflang** - Indica versiones en otros idiomas
- **Schema.org** - Organization, LocalBusiness, Product

### Ejemplo de Metadata Generada

\`\`\`html
<title>Comprar Sillas de Ruedas en Madrid | Vidalib</title>
<meta name="description" content="Comprar sillas de ruedas en Madrid. Envio gratis en 24h. Garantia 2 anos. Soporte experto 24/7.">
<link rel="canonical" href="https://vidalib.com/es/comprar-sillas-de-ruedas-en-madrid">
<meta property="og:title" content="Comprar Sillas de Ruedas en Madrid | Vidalib">
<meta property="og:image" content="https://vidalib.com/og-image.jpg">
<link rel="alternate" hreflang="en" href="https://vidalib.com/en/buy-wheelchairs-in-madrid">
<link rel="alternate" hreflang="de" href="https://vidalib.com/de/kaufen-rollstuhle-in-madrid">
\`\`\`

---

## Sitemaps

### Estructura

\`\`\`
/sitemap.xml                    # Index principal
├── /sitemaps/pages.xml         # Paginas estaticas (home, about, contact)
├── /sitemaps/es.xml            # ~30,000 URLs en espanol
├── /sitemaps/en.xml            # ~30,000 URLs en ingles
├── /sitemaps/de.xml            # ~30,000 URLs en aleman
├── /sitemaps/fr.xml            # ~30,000 URLs en frances
├── ... (32 idiomas)
└── /sitemaps/ar.xml            # ~30,000 URLs en arabe
\`\`\`

### Contenido de cada Sitemap por Idioma

- Homepage del idioma
- Paginas de categoria (10)
- Paginas de categoria + ciudad (10 x 300 = 3,000)
- Paginas de intent + categoria (20 x 10 = 200)
- Paginas de intent + categoria + ciudad (20 x 10 x 300 = 60,000)

---

## Arquitectura Visual

\`\`\`
                    ┌─────────────────────────────────┐
                    │         VIDALIB.COM             │
                    │   Tienda Ortopedia Global       │
                    └─────────────────────────────────┘
                                   │
          ┌────────────────────────┼────────────────────────┐
          │                        │                        │
    ┌─────▼─────┐           ┌─────▼─────┐           ┌─────▼─────┐
    │ 32 IDIOMAS │           │10 CATEGORIAS│         │300+ CIUDADES│
    │  ES EN DE  │           │Sillas Ruedas│         │Madrid London│
    │  FR IT PT  │           │  Andadores  │         │Paris Berlin │
    │  ZH JA KO  │           │  Bastones   │         │ Tokyo Dubai │
    │  AR RU UK  │           │ Bano Seguro │         │Moscow Sydney│
    └────────────┘           └─────────────┘         └─────────────┘
          │                        │                        │
          └────────────────────────┼────────────────────────┘
                                   │
                    ┌──────────────▼──────────────┐
                    │    ~1 MILLON URLs SEO       │
                    │  Todas indexables Google    │
                    │  Metadata unica por pagina  │
                    └─────────────────────────────┘
                                   │
                    ┌──────────────▼──────────────┐
                    │      SHOPIFY BACKEND        │
                    │  Productos + Inventario     │
                    │  Checkout + Pagos           │
                    └─────────────────────────────┘
\`\`\`

---

## Variables de Entorno Requeridas

\`\`\`env
# Shopify
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=tu-tienda.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=tu-token-aqui

# Sitio
NEXT_PUBLIC_SITE_URL=https://vidalib.com

# Opcional - Intercom
NEXT_PUBLIC_INTERCOM_APP_ID=tu-app-id

# Opcional - Google Verification
GOOGLE_SITE_VERIFICATION=tu-codigo
\`\`\`

---

## Tecnologias Utilizadas

| Tecnologia | Uso |
|------------|-----|
| **Next.js 16** | Framework React con App Router |
| **TypeScript** | Tipado estatico |
| **Tailwind CSS v4** | Estilos utility-first |
| **shadcn/ui** | Componentes UI |
| **Shopify Storefront API** | E-commerce backend |
| **GraphQL** | Queries a Shopify |

---

## Comandos de Desarrollo

\`\`\`bash
# Instalar dependencias
npm install

# Desarrollo local
npm run dev

# Build produccion
npm run build

# Iniciar produccion
npm start
\`\`\`

---

## Autor

Vidalib - Premium Mobility Solutions

---

*Documentacion generada automaticamente - Ultima actualizacion: Febrero 2026*
