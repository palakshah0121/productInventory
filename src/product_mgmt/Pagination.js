function Pagination({ productPerPage, totalProduct, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProduct / productPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination_main">
      {pageNumbers.length > 1
        ? pageNumbers.map((number) => (
            <input
              type="button"
              className={
                currentPage === number ? "selected_page" : "deselected"
              }
              onClick={() => paginate(number)}
              href="!#"
              key={number}
              value={number}
            ></input>
          ))
        : ""}
    </div>
  );
}

export default Pagination;
