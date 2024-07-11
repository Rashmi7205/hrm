"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CalendarCheckIcon, CalendarDaysIcon, CalendarXIcon, CheckIcon, GraduationCapIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

export default function NewApplication() {

  const [activeTab, setActiveTab] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    jobRole: "",
    experience: "",
    otherInfo: "",
    educations: [
      {
        instituteName: "",
        period: {
          from: null,
          to: null,
        },
        course: "",
        courseType: "",
        universityName: "",
      },
    ],
  })
  const handleInputChange = (e:any) => {
    if (e.target.name.startsWith("education-")) {
      const index = parseInt(e.target.name.split("-")[1])
      const [_, __, field] = e.target.name.split("-")
      setFormData((prevState) => {
        const updatedEducations = [...prevState.educations]
        if (field === "from" || field === "to") {
          updatedEducations[index] = {
            ...updatedEducations[index],
            period: {
              ...updatedEducations[index].period,
              [field]: e.target.value,
            },
          }
        } else {
          updatedEducations[index] = {
            ...updatedEducations[index],
            [field]: e.target.value,
          }
        }
        return { ...prevState, educations: updatedEducations }
      })
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  }
  const handleAddEducation = () => {
    setFormData((prevState) => ({
      ...prevState,
      educations: [
        ...prevState.educations,
        {
          instituteName: "",
          period: {
            from: null,
            to: null,
          },
          course: "",
          courseType: "",
          universityName: "",
        },
      ],
    }))
  }
  const handleRemoveEducation = (index:number) => {
    setFormData((prevState) => ({
      ...prevState,
      educations: prevState.educations.filter((_, i) => i !== index),
    }))
  }
  const handleSubmit = (e:any) => {
    e.preventDefault()
    console.log(formData)
    alert("Application successfully submitted!")
  }
  const handlePrevious = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1)
    }
  }
  const handleNext = () => {
    if (activeTab < 4) {
      setActiveTab(activeTab + 1)
    }
  }

  return (
    <div className="bg-background rounded-lg  p-6 w-4/5 lg:h-[90%]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Job Application</h2>
        <div className="flex items-center gap-2 ">
          <Button
            variant="ghost"
            size="icon"
            className={activeTab === 0 ? "bg-green-500 text-primary-foreground z-50" : ""}
            onClick={() => setActiveTab(0)}
          >
            <CalendarDaysIcon className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={activeTab === 1 ? "bg-primary text-primary-foreground z-50" : ""}
            onClick={() => setActiveTab(1)}
          >
            <CalendarCheckIcon className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={activeTab === 2 ? "bg-primary text-primary-foreground z-50" : ""}
            onClick={() => setActiveTab(2)}
          >
            <CalendarXIcon className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={activeTab === 3 ? "bg-primary text-primary-foreground z-50" : ""}
            onClick={() => setActiveTab(3)}
          >
            <GraduationCapIcon className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={activeTab === 4 ? "bg-primary text-primary-foreground z-50" : ""}
            onClick={() => setActiveTab(4)}
          >
            <CheckIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <div className="relative flex items-center justify-between h-8">
        <div className="absolute inset-x-0 h-1 bg-muted rounded-full">
          <div className="h-full bg-green-500 rounded-full" style={{ width: `${(activeTab / 4) * 100}%` }} />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={activeTab === 0 ? "bg-green-500 p-2  text-primary-foreground z-50" : "z-50 bg-green-500"}
          onClick={() => setActiveTab(0)}
        >
          <div className="flex flex-col items-center">
            <CalendarDaysIcon className="w-5 h-5" />
          </div>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={activeTab === 1 ? "p-2  text-primary-foreground z-50 bg-green-500" : "z-50 bg-green-500"}
          onClick={() => setActiveTab(1)}
        >
          <div className="flex flex-col items-center">
            <CalendarCheckIcon className="w-5 h-5" />
          </div>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={activeTab === 2 ? " p-2  text-primary-foreground z-50 bg-green-500" : "z-50 bg-green-500"}
          onClick={() => setActiveTab(2)}
        >
          <div className="flex flex-col items-center">
            <CalendarXIcon className="w-5 h-5" />
          </div>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={activeTab === 3 ? "p-2  text-primary-foreground z-50 bg-green-500" : "z-50 bg-green-500"}
          onClick={() => setActiveTab(3)}
        >
          <div className="flex flex-col items-center">
            <GraduationCapIcon className="w-5 h-5" />
          </div>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={activeTab === 4 ? "p-2  text-primary-foreground z-50 bg-green-500" : "z-50 bg-green-500"}
          onClick={() => setActiveTab(4)}
        >
          <div className="flex flex-col items-center">
            <CheckIcon className="w-5 h-5" />
          </div>
        </Button>
      </div>
      <div className="mt-8">
        {activeTab === 0 && (
          <form>
            <h3 className="text-lg font-bold mb-2">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={handlePrevious}>
                Previous
              </Button>
              <Button onClick={handleNext}>Next</Button>
            </div>
          </form>
        )}
        {activeTab === 1 && (
          <form>
            <h3 className="text-lg font-bold mb-2">Job Role</h3>
            <div className="space-y-2">
              <Label htmlFor="jobRole">Job Role</Label>
              <Input
                id="jobRole"
                name="jobRole"
                value={formData.jobRole}
                onChange={handleInputChange}
                placeholder="Enter the job role you are applying for"
              />
            </div>
            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={handlePrevious}>
                Previous
              </Button>
              <Button onClick={handleNext}>Next</Button>
            </div>
          </form>
        )}
        {activeTab === 2 && (
          <form>
            <h3 className="text-lg font-bold mb-2">Previous Experience</h3>
            <div className="space-y-2">
              <Label htmlFor="experience">Experience</Label>
              <Textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="Describe your previous work experience"
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2 mt-4">
              <Label htmlFor="otherInfo">Other Information</Label>
              <Textarea
                id="otherInfo"
                name="otherInfo"
                value={formData.otherInfo}
                onChange={handleInputChange}
                placeholder="Provide any other relevant information"
                className="min-h-[100px]"
              />
            </div>
            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={handlePrevious}>
                Previous
              </Button>
              <Button onClick={handleNext}>Next</Button>
            </div>
          </form>
        )}
      {activeTab === 3 && (
          <form>
            <h3 className="text-lg font-bold mb-2">Education</h3>
            {formData.educations.map((education, index) => (
              <div key={index} className="space-y-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`education-${index}-instituteName`}>Institute Name</Label>
                    <Input
                      id={`education-${index}-instituteName`}
                      name={`education-${index}-instituteName`}
                      value={education.instituteName}
                      onChange={handleInputChange}
                      placeholder="Enter the institute name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`education-${index}-from`}>From</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start font-normal">
                          {education.period.from ? new Date(education.period.from).toLocaleDateString() : "Pick a date"}
                          <div className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          onSelect={(date) =>
                            handleInputChange({
                              target: {
                                name: `education-${index}-from`,
                                value: date,
                              },
                            })
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`education-${index}-to`}>To</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start font-normal">
                          {education.period.to ? new Date(education.period.to).toLocaleDateString() : "Pick a date"}
                          <div className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          onSelect={(date) =>
                            handleInputChange({
                              target: {
                                name: `education-${index}-to`,
                                value: date,
                              },
                            })
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`education-${index}-course`}>Course</Label>
                    <Input
                      id={`education-${index}-course`}
                      name={`education-${index}-course`}
                      value={education.course}
                      onChange={handleInputChange}
                      placeholder="Enter the course taken"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`education-${index}-courseType`}>Course Type</Label>
                    <Input
                      id={`education-${index}-courseType`}
                      name={`education-${index}-courseType`}
                      value={education.courseType}
                      onChange={handleInputChange}
                      placeholder="Enter the course type"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`education-${index}-universityName`}>University Name</Label>
                  <Input
                    id={`education-${index}-universityName`}
                    name={`education-${index}-universityName`}
                    value={education.universityName}
                    onChange={handleInputChange}
                    placeholder="Enter the university name"
                  />
                </div>
                <Button variant="outline" size="sm" onClick={() => handleRemoveEducation(index)}>
                  Remove Education
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={handleAddEducation}>
              Add Education
            </Button>
            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={handlePrevious}>
                Previous
              </Button>
              <Button onClick={handleNext}>Next</Button>
            </div>
          </form>
        )}
        {activeTab === 4 && (
          <div className="flex justify-end">
            <Button type="submit" onClick={handleSubmit}>
              Submit Application
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}