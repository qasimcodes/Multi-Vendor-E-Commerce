const [loader, setLoader] = useState(false);

const fetchProducts = async () => {
    try {
          setLoader(true);
          const {data} = await axios.get("http://localhost:8000/api/v1/products");
          const {products} = data;
          setProducts(products);
          console.log(products);
          setLoader(false);
    } catch (error) {
          setLoader(false);
          console.log(error.error);
    }
}