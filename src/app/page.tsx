'use client'
import React, { useEffect, useRef, useState } from "react";
import ButtonComponent from "@/components/Button/Button";
import ModalComponent from "@/components/Modal/Modal";
import SidebarComponent from "@/components/Sidebar/Sidebar";
import DatePicker from "@/components/DatePicker/DatePicker";
import SelectComponent from "@/components/Select/Select";
import DataTable from "@/components/Table/Table";
import { createTime, deleteTime, getTimes, updateTime } from "@/server/time";
import dayjs, { Dayjs } from "dayjs";
import { SelectChangeEvent } from "@mui/material";
import { getOrganizations } from "@/server/organization";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(timezone);

export default function Home() {
  const modalRef = useRef<HTMLDivElement>(null)
  const modalDeleteRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [user, setUser] = useState<any | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [organizations, setOrganizations] = useState(null)
  const [hourStart, setHourStart] = useState(new Date)
  const [hourEnd, setHourEnd] = useState(new Date)
  const [organizationSelected, setOrganizationSelected] = useState(0)
  const [times, setTimes] = useState(null)
  const [timeId, setTimeId] = useState(0)
  const [isCreate, setIsCreate] = useState(false)

  useEffect(() => {
    const foundUser = localStorage.getItem("user")
    if (foundUser) {
      const parsedUser = JSON.parse(foundUser)
      setUser(parsedUser)
    }
    getTimeClocks()
    getOrganization()
  }, []) 

  const handleClickToShowModal = () => {
    setIsCreate(true)
    setShowModal(!showModal)
  }

  const handleCreate = async () => {
    const data = {
      hourStart: dayjs(hourStart).utc().toDate(),
      userId: user.id,
      organizationId: organizationSelected
    }
    try {
      const time = await createTime(data)
      getTimeClocks()
      setShowModal(false)
    } catch (error) {
      throw error
    }
  }

  const handleEdit = async () => {
    const data = {
      hourStart: dayjs(hourStart).toDate(),
      hourEnd: dayjs(hourEnd).toDate(),
      userId: user.id,
      organizationId: organizationSelected
    }
    try {
      const time = await updateTime(timeId, data)
      getTimeClocks()
      setShowModal(false)
    } catch (error) {
      throw error
    }
  }

  const handleDelete = async () => {
    const time = await deleteTime(timeId)
    getTimeClocks()
    setShowDeleteModal(false)
  }

  const handleCancel = () => {
    setShowModal(false)
  }

  const handleDeleteCancel = () => {
    setShowDeleteModal(false)
  }

  const startHourChange = (newValue: Dayjs | null) => {
    console.log(newValue?.toDate())

    if (newValue) {
      setHourStart(newValue.toDate())
    }
  }

  const endHourChange = (newValue: Dayjs | null) => {
    console.log(newValue?.toDate())

    if (newValue) {
      setHourEnd(newValue.toDate())
    }
  }

  const handleSelectOrganization = (event: SelectChangeEvent<string>) => {
    const value = Number(event.target.value)
    console.log(value)
    setOrganizationSelected(value)
  }

  const getTimeClocks = async () => {
    try {
      const times = await getTimes()
      setTimes(times)
    } catch (error) {
      throw error
    }
  }

  const getOrganization = async () => {
    try {
      const organizations = await getOrganizations()
      setOrganizations(organizations)
    } catch (error) {
      throw error
    }
  }

  const handleEditClicked = (row: any) => {
    setIsCreate(false)
    setTimeId(row.id)
    setOrganizationSelected(row.organizationId)
    setHourStart(row.hourStart)
    setHourEnd(row.hourEnd)
    setShowModal(true)
  }

  const handleDeleteClicked = (id: number) => {
    setTimeId(id)
    setShowDeleteModal(true)
  }

  return (
    <>
      <main>
        <SidebarComponent />
        <div className="sm:ml-64 flex flex-col">
          <header className="shadow-md h-14 w-full flex items-center p-4 dark:bg-gray-800 dark:text-white">Time Planner</header>

          <section className="p-4">
            <div className="w-full flex items-center justify-between border-b-2 mt-4 pb-2">
              <span>Days and Hours</span>

              {user?.role === 1 && (
                <div>
                  <ButtonComponent ref={buttonRef} onClick={() => handleClickToShowModal()} text="New TimeClock" />
                </div>
              )}
            </div>

            <div className="mt-4">
              <DataTable content={times!} handleEdit={handleEditClicked} handleDelete={handleDeleteClicked} user={user} />
            </div>
          </section>
        </div>
      </main>

      <ModalComponent ref={modalRef} handleOk={isCreate ? handleCreate : handleEdit} handleCancel={handleCancel} isModalOpen={showModal} title="New TimeClock">
        <DatePicker label="Start Hour" onChange={startHourChange} date={dayjs(hourStart).utc()} />
        {!isCreate && (
          <DatePicker label="End Hour" onChange={endHourChange} date={dayjs(hourEnd).utc()} />
        )}
        <SelectComponent 
          label="Organization" 
          options={organizations || []}
          onChange={handleSelectOrganization}
          choice={organizationSelected.toString()}
        />
      </ModalComponent>

      <ModalComponent ref={modalDeleteRef} handleOk={handleDelete} handleCancel={handleDeleteCancel} isModalOpen={showDeleteModal} title="Delete TimeClock">
       <h4>Tem certeza de que deseja deletar o time?</h4>
      </ModalComponent>
    </>
  );
}
