const Home = () => {
  const ItemImage = ({ img }) => {
    return <img src={img} className="card-img-top" alt="..."></img>;
  };

  const Title = ({ title }) => {
    return <h5 className="card-title mt-2">{title}</h5>;
  };

  const Description = ({ desc }) => {
    return <p className="card-text">{desc}</p>;
  };

  const Price = ({ price }) => {
    return <h5 className="card-title">{price}</h5>;
  };

  const Button = ({ btnTitle, btnColor }) => {
    return (
      <a href="#" className={btnColor}>
        {btnTitle}{" "}
      </a>
    );
  };

  const SearchForm = () => {
    return (
      <div className="searchContainer col-8 p-4 shadow rounded-4">
        <form className="d-flex" role="search">
          <input
            className="searchBar form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => console.log(e.target.value)}
          />
          <button className="search-btn" type="submit">
            Search
          </button>
        </form>
      </div>
    );
  };

  const Item = ({ img, title, desc, price, btnTitle, btnColor }) => {
    return (
      <div className="col-md-4 mb-4">
        <div
          className="card shadow"
          style={{ width: "18rem", height: "30rem" }}
        >
          <div className="card-body">
            <ItemImage img={img} />
            <Title title={title} />
            <Description desc={desc} />
            <Price price={price} />
          </div>
          <div className="card-footer p-2 bg-transparent">
            <div className="d-flex justify-content-around">
              <Button
                className="fixed-bottom"
                btnTitle={btnTitle}
                btnColor={btnColor}
              />
              <Button
                className="fixedbottom"
                btnTitle="Add to cart"
                btnColor="btn btn-success"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const tea_items = [
    {
      id: 1,
      title: "Cinoman Tea",
      img: "https://i.pinimg.com/736x/73/fe/e2/73fee27cb33a7e40a931f470e47a4752.jpg",
      desc: "Cinnamon tea made from the fresh tea leaves",
      price: "Rs. 1000",
      btnTitle: "Book Now",
      btnColor: "btn btn-primary",
    },
    {
      id: 2,
      title: "Green Tea",
      img: "https://i.pinimg.com/1200x/e3/25/3c/e3253cf6a271674e201e1415c8e77cdc.jpg",
      desc: "Grean Tea is nice and fresh",
      price: "Rs. 1500",
      btnTitle: "Book Now",
      btnColor: "btn btn-primary",
    },
    {
      id: 3,
      title: "Orange Tea",
      img: "https://i.pinimg.com/736x/2d/00/fa/2d00fa9769224e928fdd010b0c98ab9f.jpg",
      desc: "Fresh Orange tea made from the fresh tea leaves",
      price: "Rs. 1200",
      btnTitle: "Book Now",
      btnColor: "btn btn-primary",
    },
    {
      id: 4,
      title: "Blue Marigold Tea",
      img: "https://i.pinimg.com/736x/cf/82/85/cf82857f8fb09b63aec28e7b0671ced6.jpg",
      desc: "Blue Marigold tea made from the fresh tea leaves",
      price: "Rs. 1000",
      btnTitle: "Book Now",
      btnColor: "btn btn-primary",
    },
    {
      id: 5,
      title: "cappuccino",
      img: "https://i.pinimg.com/736x/c9/a3/f2/c9a3f2aebfa384a09f86274471f5c2ea.jpg",
      desc: "Capaccino made from the fresh tea leaves",
      price: "Rs. 1800",
      btnTitle: "Book Now",
      btnColor: "btn btn-primary",
    },
  ];

  return (
    <>
      <div className="container mt-5 pt-5">
        <div className="d-flex mb-5 justify-content-center">
          <SearchForm />
        </div>
        <div className="row d-flex align-items-justify">
          {tea_items.map((item) => (
            <Item
              img={item.img}
              title={item.title}
              desc={item.desc}
              price={item.price}
              btnTitle={item.btnTitle}
              btnColor={item.btnColor}
              key={item.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
