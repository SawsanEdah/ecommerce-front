import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import PaginatedItems from "../../Pagination/Pagination";
import { Axios } from "../../Api/Axios";
import { useEffect, useState } from "react";
import TransformDate from "../../helper/TransformDate";

export default function TableShow(props) {
  const currentUser = props.currentUser || { name: "" };

  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  console.log(date);
  const [filterdData, setFilterdData] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const filterdDataByDate =date.length !== 0 ? props.data.filter(
    (item) => TransformDate(item.created_at) === date
  ):props.data;
  console.log(filterdDataByDate);
  const filterdSearchByDate=date.length !== 0 ?filterdData.filter((item) => TransformDate(item.created_at) === date):filterdData;
  const showWhichData = search.length > 0 ? filterdSearchByDate : filterdDataByDate;

  //Get Searched Data
  async function getSearchedData() {
    try {
      const res = await Axios.post(
        `${props.searchLink}/search?title=${search}`
      );
      setFilterdData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setSearchLoading(false);
    }
  }
  // delay get searched data
  useEffect(() => {
    const delay = setTimeout(() => {
      search.length > 0 ? getSearchedData() : setSearchLoading(false);
    }, 500);

    return () => clearTimeout(delay);
  }, [search]);

  
  const headerShow = props.header.map((item, key) => (
    <th key={key}>{item.name}</th>
  ));
  const dataShow = showWhichData.map((item, key) => (
    <tr key={key}>
      <td>{item.id}</td>
      {props.header.map((item2, key2) => (
        <td key={key2}>
          {item[item2.key] === "1995" ? (
            "admin"
          ) : item[item2.key] === "1996" ? (
            "writer"
          ) : item[item2.key] === "1999" ? (
            "product manger"
          ) : item[item2.key] === "2001" ? (
            "user"
          ) : item2.key === "created_at" || item2.key === "updated_at" ? (
            TransformDate(item[item2.key])
          ) : item[item2.key] === currentUser.name ? (
            item[item2.key] + "(YOU)"
          ) : item[item2.key] === item.image ? (
            <img width="50px" src={item[item2.key]} alt="def" />
          ) : item2.key === "images" ? (
            <div className="d-flex justify-content-start align-items-center g-1 flex-wrap">
              {item[item2.key].map((img, key) => (
                <img
                  key={key}
                  width="50px"
                  src={img.image}
                  alt="product-images"
                />
              ))}
            </div>
          ) : (
            item[item2.key]
          )}
        </td>
      ))}
      <td>
        <div className="d-flex align-items-center  gap-2">
          <Link to={`${item.id}`}>
            <FontAwesomeIcon fontSize="19px" icon={faPenToSquare} />
          </Link>
          {currentUser.name !== item.name && (
            <FontAwesomeIcon
              fontSize="19px"
              color="red"
              icon={faTrash}
              onClick={() => props.delete(item.id)}
            />
          )}
        </div>
      </td>
    </tr>
  ));

  return (
    <>
      <div className="col-5">
        <Form.Control
          className="my-3"
          type="search"
          aria-label="input serch"
          placeholder="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSearchLoading(true);
          }}
        />
      </div>
      <div className="col-5">
        <Form.Control
          className="my-3"
          type="date"
          aria-label="input serch"
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
      </div>
      <Table responsive striped bordered hover>
        <thead >
          <tr>
            <th>Id</th>
            {headerShow}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.loading ? (
            <tr className="text-center">
              <td colSpan={12}> Loading ....</td>
            </tr>
          ) : searchLoading ? (
            <tr className="text-center">
              <td colSpan={12}> Searching ....</td>
            </tr>
          ) : (
            dataShow
          )}
        </tbody>
      </Table>
      <Form.Select onChange={(e) => props.setLimit(e.target.value)}>
      <option value="10">10</option>
      <option value="5">5</option>
        <option value="3">3</option>
      </Form.Select>
      
            <PaginatedItems
            itemsPerPage={props.limit}
            setLimit={props.setLimit}
            data={props.data}
            setPage={props.setPage}
            total={props.total}
          />
       
    
  </>);
}
