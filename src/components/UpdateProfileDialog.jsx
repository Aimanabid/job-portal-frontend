import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user, setUser } = useAuth();

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        // keep skills as a comma-separated string in the input field
        skills: (user?.profile?.skills && user.profile.skills.length > 0)
            ? user.profile.skills.join(", ")
            : "",
        // when updating, user can upload either an image (profile photo) or a pdf (resume)
        file: ""
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (input.fullname) formData.append("fullname", input.fullname);
        if (input.email) formData.append("email", input.email);
        if (input.phoneNumber) formData.append("phoneNumber", input.phoneNumber);
        if (input.bio) formData.append("bio", input.bio);
        if (input.skills) formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                setUser(res.data.user);
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
            toast.error(errorMessage);
        } finally{
            setLoading(false);
        }
        setOpen(false);
        console.log(input);
    }



    return (
        <div>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Update Profile</DialogTitle>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={submitHandler}>
                        <div className='grid gap-4 py-4'>
                            <TextField label="Full Name" name="fullname" type="text" value={input.fullname} onChange={changeEventHandler} fullWidth size="small" />
                            <TextField label="Email" name="email" type="email" value={input.email} onChange={changeEventHandler} fullWidth size="small" />
                            <TextField label="Phone Number" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} fullWidth size="small" />
                            <TextField label="Bio" name="bio" value={input.bio} onChange={changeEventHandler} fullWidth size="small" />
                            <TextField label="Skills (comma separated)" name="skills" value={input.skills} onChange={changeEventHandler} fullWidth size="small" />
                            <input id="file" name="file" type="file" accept="image/*,application/pdf" onChange={fileChangeHandler} className="col-span-3" />
                        </div>
                        <DialogActions>
                            {loading ? (
                                <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button>
                            ) : (
                                <Button type="submit" className="w-full my-4" variant="contained">Update</Button>
                            )}
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog