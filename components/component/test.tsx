'use client'

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"

export function Test() {
  const [title, setTitle] = useState("")
  const [tasks, setTasks] = useState([])

  const handleSubmit = () => {
    if(title.trim() == "") return alert('title is required')
    fetch('/api', {
      method: 'post',
      body: JSON.stringify({ title }),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
    })
    .catch(e => {
      console.log(e)
    })
    setTitle("")
  }

  const getData = () => {
    fetch('/api') 
    .then(res => res.json())
    .then(res => {
      console.log(res)
      setTasks(res.rows)
    })
    .catch(e => {
      console.log(e)
    })
  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="flex flex-col items-center  h-screen bg-background">
      <div className="w-full max-w-3xl p-6 md:p-8 lg:p-10 rounded-lg shadow-lg bg-card">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="flex flex-col items-center space-y-2">
            <h1 className="text-3xl font-bold text-card-foreground">Todo App</h1>
            <p className="text-muted-foreground">Organize your tasks and stay on top of your to-do list.</p>
          </div>
          <div className="w-full">
            <Textarea
            onChange={(e) => setTitle(e.target.value)}
              className="w-full h-20 p-4 text-lg font-mono bg-muted rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Add a new task..."
            />
          </div>
          <div className="flex items-center justify-between w-full">
            <Button onClick={handleSubmit}>Add Task</Button>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <CheckIcon className="w-5 h-5 text-muted-foreground" />
                <span>Complete</span>
              </Button>
              <Button variant="outline">
                <TrashIcon className="w-5 h-5 text-muted-foreground" />
                <span>Delete</span>
              </Button>
            </div>
          </div>
          <div className="w-full">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  tasks && tasks?.map((task:{title: string}, index) => {
                    return  <TableRow key={index}>
                    <TableCell>{task?.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">Pending</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon">
                          <CheckIcon className="w-4 h-4" />
                          <span className="sr-only">Complete</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <TrashIcon className="w-4 h-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  })
                }

                <TableRow>
                  <TableCell>Finish project proposal</TableCell>
                  <TableCell>
                    <Badge variant="outline">Pending</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <CheckIcon className="w-4 h-4" />
                        <span className="sr-only">Complete</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <TrashIcon className="w-4 h-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Grocery shopping</TableCell>
                  <TableCell>
                    <Badge variant="outline">Pending</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <CheckIcon className="w-4 h-4" />
                        <span className="sr-only">Complete</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <TrashIcon className="w-4 h-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
             
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}


function TrashIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}
