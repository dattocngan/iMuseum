import React, {useEffect, useState} from "react";
import {deleteItem, getItems} from "../../api/item";
import moment from "moment";
import ReactPaginate from "react-paginate";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";

export default function AllItems() {
  const [items, setItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  let [itemOffset, setItemOffset] = useState(1);
  const [deleteLoad, setDeleteLoad] = useState(false);

  useEffect(() => {
    // limit 5
    getItems(0)
      .then(response => {
        if (response.status === 200) {
          setPageCount(Math.ceil(response.data.totalItems / 5));
          setItems(response.data.items);
        }
      })
  }, [deleteLoad]);

  const handlePageClick = (data) => {
    getItems(data.selected)
      .then(response => {
        if (response.status === 200) {
          setItemOffset(data.selected * 5 + 1);
          setItems(response.data.items);
        }
      })
  }

  const deleteItemHandler = (data) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa hiện vật?",
      text: "Bạn không thể hoàn tác sau khi xóa!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItem(data).then((response) => {
          setItems(items.filter((item) => item.item_id !== data));
          Swal.fire("Đã xóa!", "Hiện vật đã được xóa thành công.", "success");
          setDeleteLoad(prevState => !prevState);
        });
      }
    });
  }

  return (
    <>
      <button className="btn btn-success mb-3"><Link to='/admin/items/add' style={{color: '#FFF'}}>Thêm hiện vật
        mới</Link></button>
      {!!items.length &&
        <div className="table-responsive">
          <table className="table table-hover table-bordered bg-white text-center">
            <thead className="table-dark">
            <tr>
              <th scope="col" className="col-1 align-middle">STT</th>
              <th scope="col" className="col-2 align-middle">Tên vật phẩm</th>
              <th scope="col" className="col-3 align-middle">Ảnh đại diện</th>
              <th scope="col" className="col-2 align-middle">Ngày thu thập</th>
              <th scope="col" className="col-2 align-middle">Trạng thái</th>
              <th scope="col" className="col-1 align-middle">Chi tiết</th>
              <th scope="col" className="col-1 align-middle">Xóa</th>
            </tr>
            </thead>
            <tbody>
            {items.map((item) =>
              <tr key={itemOffset}>
                <th scope="row" className="align-middle">{itemOffset++}</th>
                <td className="align-middle">{item.name}</td>
                <td className="align-middle"><img alt={''} width="80%"
                                                  src={item.feature_image.split('/')[3] !== 'null' ? item.feature_image : 'https://sites.google.com/site/hinhanhdep24h/_/rsrc/1436687439788/home/hinh%20anh%20thien%20nhien%20dep%202015%20%281%29.jpeg'}/>
                </td>
                <td
                  className="align-middle">{item.collected_date ? moment(item.collected_date).format('DD/MM/YYYY') : moment().format('DD/MM/YYYY')}</td>
                <td className="align-middle">{item.status ? 'Đã được duyệt' : 'Chưa được duyệt'}</td>
                <td className="align-middle">
                  <button className="btn btn-primary"><Link to={`/admin/items/${item.item_id}`}
                                                            style={{color: '#FFF'}}>Chi tiết</Link></button>
                </td>
                <td className="align-middle">
                  <button className="btn btn-danger" disabled={item.status}
                          onClick={() => deleteItemHandler(item.item_id)}>Xóa
                  </button>
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
      {!items.length && <div className="fs-4 mt-3">Bạn không có hiện vật nào.</div>}
    </>
  );
}
