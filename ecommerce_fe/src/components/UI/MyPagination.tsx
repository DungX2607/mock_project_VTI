import React from "react";
import { Pagination } from "react-bootstrap";
import { MyPaginationProps } from "../../model/paginationProps";

type paginationProps = MyPaginationProps;

const MyPagination = (props: paginationProps) => {
  const pageItems = [];

  for (let i = 1; i <= props.totalPages; i++) {
    pageItems.push(
      <Pagination.Item
        key={i}
        active={i === props.currentPage}
        onClick={() => props.onPageChange(i)}
        className="pagination__item"
      >
        {i}
      </Pagination.Item>
    );
  }

  return (
    <Pagination
      size="sm"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "1rem",
      }}
      className="pagination"
    >
      <Pagination.Prev
        disabled={props.currentPage === 1}
        onClick={() => props.onPageChange(props.currentPage - 1)}
      />
      {pageItems}
      <Pagination.Next
        disabled={props.currentPage === props.totalPages}
        onClick={() => props.onPageChange(props.currentPage + 1)}
      />
    </Pagination>
  );
};

export default MyPagination;
