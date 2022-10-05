import React, {useState} from 'react';

function AddItem() {
    const [isValidated, setIsValidated] = useState(false);
    const submitHandler = (e) => {
        e.preventDefault();
        if (!e.target.checkValidity()) {
            setIsValidated(true);
        }
    };
    return (
        <form className={`row g-3 needs-validation ${
            isValidated ? 'was-validated' : ''
        }`} noValidate onSubmit={submitHandler}>
            <div className="col-md-4">
                <label htmlFor="name" className="form-label">Tên hiện vật:</label>
                <input type="text" className="form-control" id="name" required />
                    <div className="invalid-feedback">
                        Tên hiện vật là bắt buộc
                    </div>
            </div>
            <div className="col-md-4">
                <label htmlFor="original" className="form-label">Nguồn gốc:</label>
                <input type="text" className="form-control" id="original" />
            </div>
            <div className="col-md-4">
                <label htmlFor="dimension" className="form-label">Kích thước:</label>
                <input type="text" className="form-control" id="dimension" />
            </div>
            <div className="col-md-3">
                <label htmlFor="weight" className="form-label">Cân nặng (kg):</label>
                <input type="number" className="form-control" id="weight" />
            </div>
            <div className="col-md-3">
                <label htmlFor="material" className="form-label">Nguyên liệu</label>
                <select className="form-select" id="material" defaultValue={''} required>
                    <option value="" disabled>Chọn nguyên liệu...</option>
                    <option>A</option>
                </select>
                <div className="invalid-feedback">
                    Nguyên liệu là bắt buộc
                </div>
            </div>
            <div className="col-md-3">
                <label htmlFor="age" className="form-label">Niên đại</label>
                <select className="form-select" id="age" defaultValue={''} required>
                    <option value="" disabled>Chọn niên đại...</option>
                    <option>A</option>
                </select>
                <div className="invalid-feedback">
                    Niên đại là bắt buộc
                </div>
            </div>
            <div className="col-md-3">
                <label htmlFor="date" className="form-label">Ngày thu thập:</label>
                <input type="date" className="form-control" id="date" />
            </div>
            <div className="col-md-6">
                <label htmlFor="feature_image" className="form-label">Ảnh đại diện hiện vật:</label>
                <input className="form-control" type="file" id="feature_image" required />
                <div className="invalid-feedback">
                    Ảnh đại diện là bắt buộc
                </div>
            </div>
            <div className="col-md-6">
                <label htmlFor="images" className="form-label">Các ảnh hiện vật:</label>
                <input className="form-control" type="file" id="images" multiple />
            </div>
            <div className="col-12">
                <label htmlFor="description" className="form-label">Mô tả</label>
                <textarea className="form-control" id="description" rows="7"></textarea>
            </div>
            <div className="col-12">
                <button className="btn btn-primary" type="submit">Thêm hiện vật</button>
            </div>
        </form>
    );
}

export default AddItem;