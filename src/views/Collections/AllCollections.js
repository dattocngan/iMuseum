import React from 'react';
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate";
import {useEffect, useState} from "react";
import {getCollections} from "../../api/collection";

function AllCollections() {
  const [collections, setCollections] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  let [collectionOffset, setCollectionOffset] = useState(1);

  useEffect(() => {
    // limit 5
    getCollections(0)
      .then(response => {
        if (response.status === 200) {
          setPageCount(Math.ceil(response.data.totalCollections / 5));
          setCollections(response.data.collections);
        }
      })
  }, []);

  const handlePageClick = (data) => {
    getCollections(data.selected)
      .then(response => {
        if (response.status === 200) {
          setCollectionOffset(data.selected * 5 + 1);
          setCollections(response.data.collections);
        }
      })
  }
  return (
    <>
      <button className="btn btn-success mb-3"><Link to='/admin/collections/add' style={{color: '#FFF'}}>Thêm bộ sưu tập
        mới</Link></button>
      {!!collections.length &&
        <div className="table-responsive">
          <table className="table table-hover table-bordered bg-white text-center">
            <thead className="table-dark">
            <tr>
              <th scope="col" className="col-1 align-middle">STT</th>
              <th scope="col" className="col-2 align-middle">Tiêu đề bộ sưu tập</th>
              <th scope="col" className="col-3 align-middle">Ảnh bộ sưu tập</th>
              <th scope="col" className="col-2 align-middle">Thể loại</th>
              <th scope="col" className="col-2 align-middle">Trạng thái</th>
              <th scope="col" className="col-2 align-middle">Chi tiết</th>
            </tr>
            </thead>
            <tbody>
            {collections.map((collection) =>
              <tr key={collectionOffset}>
                <th scope="row" className="align-middle">{collectionOffset++}</th>
                <td className="align-middle">{collection.title}</td>
                <td className="align-middle"><img alt={''} width="80%"
                                                  src={collection.image.split('/')[3] !== 'null' ? collection.image : 'https://sites.google.com/site/hinhanhdep24h/_/rsrc/1436687439788/home/hinh%20anh%20thien%20nhien%20dep%202015%20%281%29.jpeg'}/>
                </td>
                <td className="align-middle">{collection.type}</td>
                <td className="align-middle">{collection.status ? 'Đã được duyệt' : 'Chưa được duyệt'}</td>
                <td className="align-middle">
                  <button className="btn btn-primary">Chi tiết</button>
                </td>
              </tr>
            )}
            </tbody>
          </table>
          <ReactPaginate
            previousLabel={'Trước'}
            nextLabel={'Tiếp'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={3}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={'pagination justify-content-center'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            activeClassName={'active'}
          />
        </div>
      }
      {!collections.length && <div className="fs-4 mt-2">Bạn không có bộ sưu tập nào.</div>}
    </>
  );
}

export default AllCollections;