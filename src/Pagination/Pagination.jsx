
import ReactPaginate from "react-paginate";
import "./Pagination.css"





export default function PaginatedItems({ itemsPerPage,data,total,setPage }) {
  const pageCount=total / itemsPerPage ;

  return (
    
        <ReactPaginate
                breakLabel="..."
                nextLabel=">>"
                onPageChange={(e)=>setPage(e.selected +1 )} 
                pageRangeDisplayed={2}
                pageCount={pageCount}
                previousLabel="<<"
                renderOnZeroPageCount={null}
                containerClassName="custom-pagination d-flex align-items-center justify-content-end"
                pageLinkClassName="pagination-tag-anchor text-secondary mx-2 rounded-circle"
                activeLinkClassName="text-white bg-primary"
              />

      
      
  
  );
}
