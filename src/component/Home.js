import React, {useEffect, useState} from 'react';
import Header from './Header';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import Error from './Error'
import { FiSearch } from "react-icons/fi";
import Spinners from './Spinners';

const Home = () => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [user, setUser] = useState([]);
    const [active, setActive] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);

    const userDetails = async(id) => {
        const data = await axios.get(`https://602e7c2c4410730017c50b9d.mockapi.io/users/${id}`);
        console.log(data);
        setUser(data);
        setActive(id);
        setShow(true);
        // console.log(active);
    }

    const searchItems = (searchValue) => {
      setSearchInput(searchValue)
      console.log(searchValue);
      if (searchInput !== '') {
        const filteredData = data.filter((data) => {
          return Object.values(data.profile.firstName+ " " + data.profile.lastName).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData);
      }else{
        setFilteredResults(data);
      }
      
      // data.filter((data) => {
      //   return Object.values(data.profile.firstName).join('').toLowerCase().includes(searchInput.toLowerCase())
      // })
    }

    

    // console.log(filteredData);

    useEffect(() => {
        async function getUsers() {
          try{
            setLoading(true);
            const data = await axios.get(
              "https://602e7c2c4410730017c50b9d.mockapi.io/users",
            ).then((data) => data.data);
    
            setData(data);
            setLoading(false);
            setError(false);
            console.log(data);
          }catch (error){
            console.log(error);
            setError(true);
          }
        }
    
        getUsers();
    }, []);

    
  return (
    <>
    <div className='pb-5'>
      <Header />
    </div>
    <Container>
      <Row className="justify-content-md-center">
        <Col x="12" lg="5" style={{ marginRight: '2%', height: 'auto'}}>
            <div className='rounded-top p-3' style={{background: '#C5DFFF', BorderRadiusBottomleft: '0'}}>
                <div className='card-body text-center'>
                    USER LISTS
                </div>
            </div>
            
            {/* Search bar */}
            <div
          style={{ width: "360px", paddingTop: "15px", paddingBottom: "15px", margin: '0 auto' }}
          className="input-group flex-nowrap">
          <span
            style={{
              borderBottomLeftRadius: "21px",
              borderTopLeftRadius: "21px",
              backgroundColor: "#F2F2F2",
              border: "none",
            }}
            className="input-group-text"
            id="addon-wrapping"
          >
            <FiSearch />
          </span>
          <input
            style={{
              fontSize: "13px",
              borderTopRightRadius: "21px",
              borderBottomRightRadius: "21px",
              backgroundColor: "#F2F2F2",
              border: "none",
            }}
            type="text"
            className="form-control"
            placeholder="Search for full name or first name or last name"
            onChange={(e) => searchItems(e.target.value)}
          />
          </div>

            <div style={{
                overflowY: "scroll",
                height: "75vh"
            }}>

            {error ? <Error /> : loading ? <Spinners /> : (
                <>
                {
                    searchInput.length > 1 ? (filteredResults.map((data) => {
                      return (
                        <div className='card mt-2 mb-2'>
                        <div className={`card-body list-item ${data.id === active ? 'active' : ''}`} key={data.id} onClick={() => userDetails(data.id)}> {console.log(data.id===active)}
                            <div style={{ display: "flex" }}>
                            <img
                                style={{ width: "40px", height: "40px" }}
                                className='rounded-circle'
                                src={data.avatar}
                                onError={event => {
                                    event.target.src= `https://ui-avatars.com/api/?name=${data.profile.firstName}+${data.profile.lastName}?background=random`
                                    event.onerror = null                    
                                }}
                                alt="user"
                            />
                            &nbsp;&nbsp;
                            <h6
                                style={{
                                fontSize: "15px",
                                fontWeight: "700",
                                marginTop: "10px",
                                }}
                            >
                                {data.profile.firstName+ " " + data.profile.lastName}
                            </h6>
                            </div>
                            </div>
                        </div>
                      )
                    })) : (
                    data.map((data) => (
                        <div className='card mt-2 mb-2'>
                        <div className={`card-body list-item ${data.id === active ? 'active' : ''}`} key={data.id} onClick={() => userDetails(data.id)}> {console.log(data.id===active)}
                            <div style={{ display: "flex" }}>
                            <img
                                style={{ width: "40px", height: "40px" }}
                                className='rounded-circle'
                                src={data.avatar}
                                onError={event => {
                                    event.target.src= `https://ui-avatars.com/api/?name=${data.profile.firstName}+${data.profile.lastName}?background=random`
                                    event.onerror = null                    
                                }}
                                alt="user"
                            />
                            &nbsp;&nbsp;
                            <h6
                                style={{
                                fontSize: "15px",
                                fontWeight: "700",
                                marginTop: "10px",
                                }}
                            >
                                {data.profile.firstName+ " " + data.profile.lastName}
                            </h6>
                            </div>
                            </div>
                        </div>
                    )))
                }
                </>
            ) }
            </div>
            
        </Col>
        <Col xs="12" lg="5" id='padTop' height={"85vh"} >
            <div className='rounded-top p-3' style={{background: '#C5DFFF'}}>
                <div className='card-body text-center'>
                    USER DETAILS
                </div>
            </div>
                {
                    error ? <Error/> : loading ? <Spinners/> : show === false ? (
                        <>
                        <p className='text-center h5 pt-5'> Click on user to see details</p>
                        </>
                    ) :
                    <>
                    <div className='col d-flex justify-content-center'>
                    <div style={{width: '70%'}}>
                        <div className='body'>
                            <div className='text-center mt-3'>
                            <img
                                style={{ width: "100px", height: "100px" }} 
                                className='rounded-circle text-center'
                                src={user.data.avatar}
                                onError={event => {
                                    event.target.src= `https://ui-avatars.com/api/?name=${user.data.profile.firstName}+${user.data.profile.lastName}?background=random`
                                    event.onerror = null                    
                                }}
                                alt="user"
                            />
                            </div>
                            <div className='card-title mt-2 text-center'>{user.data.profile.username}</div>
                            <div className='form-group'>
                                <label htmlFor="formControl">Bio</label>
                                <textarea className='form-control' id='formControl' rows="3" placeholder={user.data.Bio} style={{background: "rgb(192 190 190)"}} readOnly></textarea>
                            </div>
                            <div className='form-group mt-4'>
                                <label htmlFor="formControl">Full Name</label>
                                <input className='form-control' id='formControl' placeholder={user.data.profile.firstName + " " + user.data.profile.lastName}  style={{background: "rgb(192 190 190)"}} readOnly></input>
                            </div>
                            <div className='form-group mt-3'>
                                <label htmlFor="formControl">Job Title</label>
                                <input className='form-control' id='formControl' placeholder={user.data.jobTitle}  style={{background: "rgb(192 190 190)"}} readOnly></input>
                            </div>
                            <div className='form-group mt-3'>
                                <label htmlFor="formControl">Email</label>
                                <input className='form-control' id='formControl' placeholder={user.data.profile.email}  style={{background: "rgb(192 190 190)"}} readOnly></input>
                            </div>
                            <br />
                            <br />
                        </div>
                    </div>
                    </div>
                    </>
                }
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default Home
