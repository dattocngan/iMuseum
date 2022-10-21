import { getCollections } from "api/collection";
import { getCollectorInformation } from "api/collector";
import { getItems } from "api/item";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { titleActions } from "store/title";
import Loader from "UI/Loader";
import Modal from "UI/Modal";
import DashboardChart from "./DashboardChart";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [collectorInfomation, setCollectorInformation] = useState({
    fullname: "",
    birthday: "",
    email: "",
  });
  const [itemsInformation, setItemsInformation] = useState({
    totalItems: 0,
    acceptedItems: 0,
    queuedItems: 0,
  });

  const [collectionsInformation, setCollectionsInformation] = useState({
    totalCollections: 0,
    acceptedCollections: 0,
    queuedCollections: 0,
  });

  useEffect(() => {
    dispatch(titleActions.setTitle(""));
  }, [dispatch]);

  useEffect(() => {
    Promise.all([
      getCollectorInformation(),
      getItems(0),
      getCollections(0),
    ]).then((responses) => {
      const totalItems = responses[1].data.totalItems;
      const acceptedItems = responses[1].data.items.filter(
        (item) => item.status === 1
      ).length;
      const queuedItems = totalItems - acceptedItems;

      const totalCollections = responses[2].data.totalCollections;
      const acceptedCollections = responses[2].data.collections.filter(
        (collection) => collection.status === 1
      ).length;
      const queuedCollections = totalCollections - acceptedCollections;

      setCollectorInformation({
        fullname: responses[0].data.full_name,
        birthday: responses[0].data.birth_date
          ? moment(responses[0].data.birth_date).format("DD/MM/YYYY")
          : "",
        email: responses[0].data.email,
      });
      setItemsInformation({
        totalItems,
        acceptedItems,
        queuedItems,
      });
      setCollectionsInformation({
        totalCollections,
        acceptedCollections,
        queuedCollections,
      });

      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading && <Modal children={<Loader />} />}
      {!isLoading && (
        <div className="row gy-3">
          <h3>Dashboard</h3>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">Nhà sưu tập</div>
              <div className="card-body">
                <p className="card-title fw-bold">
                  Họ tên: {collectorInfomation.fullname}
                </p>
                <p className="card-text mb-1">
                  Ngày sinh: {collectorInfomation.birthday}
                </p>
                <p className="card-text">
                  Địa chỉ email: {collectorInfomation.email}
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card">
              <div className="card-header text-center">Tổng số hiện vật</div>
              <div className="card-body d-flex justify-content-center">
                <span className="card-text fs-2 fw-bold">
                  {itemsInformation.totalItems}
                </span>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card">
              <div className="card-header text-center">Tổng số bộ sưu tập</div>
              <div className="card-body d-flex justify-content-center">
                <span className="card-text fs-2 fw-bold">
                  {collectionsInformation.totalCollections}
                </span>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <div className="card-header">Hiện vật</div>
              <div className="card-body">
                <DashboardChart
                  statistics={[
                    itemsInformation.acceptedItems,
                    itemsInformation.queuedItems,
                  ]}
                />
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <div className="card-header">Bộ sưu tập</div>
              <div className="card-body">
                <DashboardChart
                  statistics={[
                    collectionsInformation.acceptedCollections,
                    collectionsInformation.queuedCollections,
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
