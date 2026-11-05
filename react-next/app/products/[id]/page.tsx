const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <div>ProductPage</div>;
};

export default ProductPage;
