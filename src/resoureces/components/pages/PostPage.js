import React, { useState, useEffect } from 'react';
import AxiosInstance from '../../helper/Axiosintances';
import { toast } from 'react-toastify';
import { Modal, Button, Spinner, Navbar, FormControl, Form } from 'react-bootstrap';
import { IoLockClosed, IoLockOpen } from "react-icons/io5";
import { postNewsData } from '../../Service/PostNewServices';
import '../css/userList.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const PostPage = () => {
    const [postData, setPostData] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await postNewsData();
            setPostData(res);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Lỗi khi tải dữ liệu bản tin!');
            setLoading(false);
        }
    };

    const toggleActivation = async (postId, activable) => {
        const action = activable ? 'ẩn' : 'hiện';
        MySwal.fire({
            title: `Bạn có chắc chắn muốn ${action} bài viết này không?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Đúng, ${action} bài viết!`,
            cancelButtonText: 'Hủy',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await AxiosInstance().post(`/api/postnews/activable/${postId}`);
                    if (response && response.data.success) {
                        fetchData();
                    } else {
                        toast.error('Có lỗi xảy ra!');
                    }
                } catch (error) {
                    MySwal.fire(
                        'Error!',
                        `Error ${action}ing bài viết: ${error.message}`,
                        'error'
                    );
                }
            }
        });
    };

    const handleShowModal = (post) => {
        setSelectedPost(post);
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const filteredPostData = postData
        .filter(post => post.title.toLowerCase().includes(searchKeyword.toLowerCase()))
        .sort((a, b) => b.activable - a.activable
        );

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" role="status" />
                <p className="mt-3">Đang tải danh sách bài đăng...</p>
            </div>
        );
    }

    // Styles
    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
    };
    const cellStyle = {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
    };
    const center = {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'center',
    };
    const lockedStyle = {
        backgroundColor: '#f8d7da',
    };

    return (
        <div className="container-fluid">
            <h1 className="display-4 post-page-title">Danh sách bài đăng</h1>
            <Navbar bg="light" expand="lg" className="mb-3">
                <Navbar.Brand href="#home">Tìm Kiếm</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Form inline>
                        <FormControl
                            type="text"
                            placeholder="Nhập từ muốn tìm kiếm"
                            className="mr-sm-2"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            <table className="table" style={tableStyle}>
                <thead>
                    <tr>
                        <th style={center}>STT</th>
                        <th style={center}>Tiều đề</th>
                        <th style={center}>Hình ảnh</th>
                        <th style={center}>Trạng thái</th>
                        <th style={cellStyle}></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPostData.map((post, index) => (
                        <tr key={post._id}>
                            <td style={cellStyle}>{index + 1}</td>
                            <td style={cellStyle}>{post.title}</td>
                            <td style={center}>
                                {post.files && post.files.length > 0 && (
                                    <img src={`https://datnapi.vercel.app/${post.files[0]}`} alt="post" style={{ width: '100px', height: 'auto' }} />
                                )}
                            </td>
                            <td style={{
                                ...center,
                                backgroundColor: post.activable ? '#c3e6cb' : '#f5c6cb',
                                color: post.activable ? 'green' : 'red',
                            }}>
                                {post.activable ? 'Hiện bài viết' : 'Ản bài viết'}
                            </td>
                            <td style={center}>
                                <Button variant="info" onClick={() => handleShowModal(post)}>
                                    Details
                                </Button>
                                <Button
                                    variant={post.activable ? 'success' : 'secondary'}
                                    onClick={() => toggleActivation(post._id, !post.activable)}
                                >
                                    {post.activable ? <IoLockOpen /> : <IoLockClosed />}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Post Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedPost && (
                        <div>
                            <p><strong>Tiêu đề:</strong> {selectedPost.title}</p>
                            <p><strong>Trạng Thái:</strong> {selectedPost.status}</p>
                            <p><strong>Chi tiết:</strong> {selectedPost.detail}</p>
                            <p><strong>Vị trí:</strong> {selectedPost.location}</p>
                            <p><strong>Giá:</strong> {selectedPost.price} VND</p>
                            <p><strong>Ngày đăng:</strong> {selectedPost.created_AT}</p>
                            <p><strong>Vai trò :</strong> {selectedPost.role}</p>
                            {/* <p><strong>Nhãn Hiệu:</strong> {selectedPost.brandid}</p>
                            <p><strong>Phân Loại:</strong> {selectedPost.idCategory}</p> */}
                            <p><strong>Email:</strong> {selectedPost.email}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PostPage;
