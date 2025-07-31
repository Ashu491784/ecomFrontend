import {useState} from "react"
const Dashboard = () => {

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: null, 
  });


  const TextField = ({placeholder, type}) => {
    return (
      <div className="p-3">
    <input type={type} 
    className="form-control" 
    placeholder={placeholder} 
    aria-label="Search"/>
      </div>
    );
  };

  const Button = ({title, btnColor}) =>{
    return <button type="submit" className={btnColor}>{title}</button>   
  }

  const Form = () => {
    return (
      <div>
        <form>
          <div className="row">
          <div className="col-12">
          <TextField placeholder={"Brand Name"} type="text"/>
          </div>
          <div className="col-12">
          <TextField placeholder="Description" type="text"/>
          </div>
          <div className="col-12">
          <TextField placeholder="price" type="number"/>
          </div>
          <div className="col-12">
          <TextField placeholder="Image URL" type="file"/>
          </div>
          <div className="col-12 mx-3 mt-2">
            <Button title="Save Product" btnColor="btn btn-outline-success"/>
          </div>
          </div>
        </form>
      </div>
    )
  }

  return(
       <>
    <div className="container mt-5">
      <div className="card col-8 mx-auto">
        <div className="card-header bg-dark">
          <h1 className="text-center text-light text-uppercase card-title fw-light">Add Product</h1>
        </div>
        <div className="card-body">
          <Form/>
        </div>
      </div>
    </div>
    </>

  )
}

export default Dashboard