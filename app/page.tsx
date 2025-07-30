import { Container, Filters, Title, Topbar } from "@/components/shared";



export default function Home() {
  return (
    <>
      <Container className="mt-5">
        <Title text="All Pizzas" size="lg" className="font-extrabold" />
      </Container>
      <Topbar />
      <Container className="mt-10 pb-14">
        <div className="flex gap-[60px]">
          {/* Filter */}
          <div className="w-[250px]">
            <Filters />
          </div>
          {/* Goods List */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {/* <ProductsGroupList title="Pizzas" items={[1, 2, 3, 4, 5]} />
              <ProductsGroupList title="Combos" items={[1, 2, 3, 4, 5]} /> */}
              Goods List
            </div>

          </div>
        </div>
      </Container>

    </>
  );
}
