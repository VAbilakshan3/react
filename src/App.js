import { useState } from "react";
import API from './axios';
import "./App.css";



function App() {
    const [search, setSearch] = useState('');
	const [data, setData] = useState('');
	const [clickData, setClickData] = useState('');
	const [pageCount, setPageCount] = useState(1);
	const [refresh, setRefresh] = useState("");
	const [loadButton, setLoadButton] = useState(false);

    const handleSubmit = (e) =>{
        e.preventDefault();
        API.get(`search/photos?page=${pageCount}&query=${search}`).then((result)=>{
			setData(result.data)
        })
	}
	
	
	const handleLoadMore = () => {
		setPageCount(pageCount+1);
		API.get(`search/photos?page=${pageCount}&query=${search}`).then((image)=>{
			let oldData = data
			let newData = oldData.results.concat(image.data.results)
			oldData.results = newData
			setRefresh(Math.random())
        })
	}

  return (
	  <>
	  {/* show the image details popup */}
	  	<div className="modal fade" id="imageModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div className="modal-dialog modal-dialog-centered modal-lg" role="document">
				<div className="modal-content">
				<div className="modal-header">
					<h5>{clickData ? clickData.description ? `${clickData.description.substring(0, 20)}...`: "" : ""}</h5>
					<button type="button" className="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div className="modal-body">
					{clickData ?
					 <>
					 	<div className="row">
							 <div className="col-lg-7">
								<img src={clickData.urls.regular} alt={clickData.alt_description} style={{width: 460, height: 300, objectFit: 'cover'}}/>
							 </div>
							 <div className="col-lg-5">
							 	<h5>{clickData.description || "No Description found"}</h5>
							 </div>
						</div>
					 </> 
					: <></>}
				</div>
				</div>
			</div>
		</div>


		<div className="App ml-5 mr-5 mb-3 mt-4 container-fluid">
		<div className="card col-lg-6 col-md-6 col-sm-12 offset-lg-3" style={{ boxShadow: "0 0 5px silver" }}>
			<div className="card-body">
			<p className="text-center" style={{ color:"#59ab44"}}>
				<strong>IMAGE SEARCH</strong>
			</p>
			<form onSubmit={handleSubmit}>
				<input type="search" value={search} style={{ color:"#59ab44"}} onChange={(e)=>{setSearch(e.target.value)}} placeholder="Type here to Search Image" className="form-control " />
			</form>
			</div>
		</div>
		<div className="mt-3 pr-5 pl-5 " >
			{data.results ? 
				<>
					<h5  style={{ color:"#59ab44"}}>Showing {data.total} results found</h5>
					{data.results.map((singleData, i)=>
						<div style={{display: 'inline-block' }} key={i}>
							<img className="m-2"  onClick={()=>{setClickData(singleData);window.$("#imageModal").modal("show")}} style={{height:240 , minWidth:350}} src={singleData.urls.thumb} alt={singleData.alt_description}/>
						</div>
					)}
					<div className="text-center m-5">
						<button className="btn " style={{ border:"2px solid #59ab44", color:" #59ab44"}} hidden={loadButton} onClick={handleLoadMore}>Load more...</button>
					</div>
				</>
			: <></>}
		</div>
		</div>
	</>
  );
}

export default App;
