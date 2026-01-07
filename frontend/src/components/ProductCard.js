export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h3>{product?.name || 'Product Name'}</h3>
      <p>Price: ${product?.price ?? '—'}</p>
    </div>
  );
}
