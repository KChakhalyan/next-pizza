import { Container, Title, Topbar } from "@/components/shared";


export default function Home() {
  return (
    <>
      <Container className="mt-5">
        <Title text="All Pizzas" size="lg" className="font-extrabold" />
      </Container>
      <Topbar />

    </>
  );
}
