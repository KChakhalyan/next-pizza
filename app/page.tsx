import { Container, Filters, Title, Topbar, ProductsGroupList } from "@/components/shared";




export default function Home() {
  return (
    <>
      <Container className="mt-5">
        <Title text="All Pizzas" size="lg" className="font-extrabold" />
      </Container>
      <Topbar />
      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          {/* Filter */}
          <div className="w-[250px]">
            <Filters />
          </div>
          {/* Goods List */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                title="Pizzas"
                products={[
                  {
                    id: 1,
                    name: "Pepperoni Pizza",
                    price: [{ price: 12 }],
                    imageUrl: "/products/peperoni.png",
                    items: [{ price: 12 }]
                  },
                  {
                    id: 2,
                    name: "Pepperoni Pizza",
                    price: [{ price: 12 }],
                    imageUrl: "/products/peperoni.png",
                    items: [{ price: 12 }]
                  },
                  {
                    id: 3,
                    name: "Pepperoni Pizza",
                    price: [{ price: 12 }],
                    imageUrl: "/products/peperoni.png",
                    items: [{ price: 12 }]
                  },
                  {
                    id: 4,
                    name: "Pepperoni Pizza",
                    price: [{ price: 12 }],
                    imageUrl: "/products/peperoni.png",
                    items: [{ price: 12 }]
                  }
                ]}
                categoryId={1}
              />
              <ProductsGroupList
                title="Breakfast "
                products={[
                  {
                    id: 5,
                    name: "Pepperoni Pizza",
                    price: [{ price: 12 }],
                    imageUrl: "/products/peperoni.png",
                    items: [{ price: 12 }]
                  },
                  {
                    id: 6,
                    name: "Pepperoni Pizza",
                    price: [{ price: 12 }],
                    imageUrl: "/products/peperoni.png",
                    items: [{ price: 12 }]
                  },
                  {
                    id: 7,
                    name: "Pepperoni Pizza",
                    price: [{ price: 12 }],
                    imageUrl: "/products/peperoni.png",
                    items: [{ price: 12 }]
                  },
                  {
                    id: 8,
                    name: "Pepperoni Pizza",
                    price: [{ price: 12 }],
                    imageUrl: "/products/peperoni.png",
                    items: [{ price: 12 }]
                  }
                ]}
                categoryId={2}
              />
            </div>

          </div>
        </div>
      </Container>

    </>
  );
}
