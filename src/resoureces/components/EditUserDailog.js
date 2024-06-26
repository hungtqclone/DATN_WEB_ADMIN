import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import AxiosInstance from '../helper/Axiosintances';
var bcrypt = require('bcryptjs');

const EditUserDialog = ({ user, onSave, onClose }) => {
    const [editedUser, setEditedUser] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        level: '',
        balance: ''
    });

    useEffect(() => {
        if (user) {
            setEditedUser({
                ...user,
                password: '', 
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditedUser({
            ...editedUser,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSaveUser = async () => {

        const updatedUser = {
            ...editedUser,
            password: editedUser.password ? await bcrypt.hash(editedUser.password, 12) : undefined
        };

        onSave(updatedUser);
    };

    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>Chỉnh Sửa Người Dùng</DialogTitle>
            <DialogContent>
                <TextField style={{}} margin="dense" label="Tên" name="name" value={editedUser.name} onChange={handleChange} fullWidth />
                <tr />
                <TextField margin="dense" label="Email" name="email" value={editedUser.email} onChange={handleChange} fullWidth />
                <TextField margin="dense" label="Mật khẩu (Để trống nếu không đổi)" name="password" type="password" value={editedUser.password} onChange={handleChange} fullWidth />
                <TextField margin="dense" label="Điện thoại" name="phone" value={editedUser.phone} onChange={handleChange} fullWidth />
                <TextField margin="dense" label="Level" name="level" value={editedUser.level} onChange={handleChange} fullWidth />
                <TextField margin="dense" label="Balance" name="balance" value={editedUser.balance} onChange={handleChange} fullWidth />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="vip"
                            color="primary"
                            checked={editedUser.vip}
                            onChange={handleChange}
                        />
                    }
                    label="VIP"
                />
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={handleSaveUser} color="primary" variant="contained">Lưu</Button>
                    <Button onClick={onClose} color="secondary" variant="outlined">Hủy</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EditUserDialog;