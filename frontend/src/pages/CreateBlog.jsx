import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { setBlog } from '@/redux/blogSlice'
import axios from 'axios'
import { API_BASE_URL } from "../config.js";
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import AIBlogGenerator from '../components/AIBlogGenerator.jsx';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const CreateBlog = () => {
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [aiContent, setAIContent] = useState("")
    const [isAI, setIsAI] = useState(false)
    const {blog} = useSelector(store=>store.blog)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const getSelectedCategory = (value) => {
        setCategory(value)
    }
    const createBlogHandler = async () => {
    // Just navigate to writing page with title and category
    navigate('/dashboard/write-blog/new', { state: { title, category } });
    }

    const generateWithAIHandler = async () => {
        setLoading(true);
        try {
            const aiBlog = await AIBlogGenerator(title);
            navigate('/dashboard/write-blog/new', { state: { title, category, description: aiBlog.content, isAI: true } });
        } catch (error) {
            toast.error(error.message || 'Failed to generate blog with AI');
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className='p-4 md:pr-20 h-screen md:ml-[320px] pt-20'>
            <Card className="md:p-10 p-4 dark:bg-gray-800">
            <h1 className='text-2xl font-bold'>Lets create blog</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex eius necessitatibus fugit vel distinctio architecto, ut ratione rem nobis eaque?</p>
            <div className='mt-10 '>
                <div>
                    <Label>Title</Label>
                    <Input type="text" placeholder="Your Blog Name" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-white dark:bg-gray-700" />
                </div>
                <div className='mt-4 mb-5'>
                    <Label>Category</Label>
                    <Select onValueChange={getSelectedCategory}>
                        <SelectTrigger className="w-[180px] bg-white dark:bg-gray-700">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Category</SelectLabel>
                                <SelectItem value="Web Development">Web Development</SelectItem>
                                <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                                <SelectItem value="Blogging">Blogging</SelectItem>
                                <SelectItem value="Photography">Photography</SelectItem>
                                <SelectItem value="Cooking">Cooking</SelectItem>
                                <SelectItem value="Cooking">Other</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex gap-2'>
                    <Button className="" disabled={loading || !title || !category} onClick={createBlogHandler}>
                        {loading ? <><Loader2 className='mr-1 h-4 w-4 animate-spin' />Please wait</> : "Create"}
                    </Button>
                    <Button className="" disabled={loading || !title || !category} onClick={generateWithAIHandler} variant="outline">
                        {loading ? <><Loader2 className='mr-1 h-4 w-4 animate-spin' />Generating...</> : "Generate with AI"}
                    </Button>
                </div>
            </div>
            </Card>
           
        </div>
    )
}

export default CreateBlog
