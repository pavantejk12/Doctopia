'use client'

import React, { useEffect, useState } from 'react'

interface Props {
  data: any;
}

export default function Preferences({ data }: Props) {
  const [courseId, setCourseId] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [uid, setuid] = useState<string>('');

  useEffect(() => {
    fetch('/api/customers/me')
      .then(response => response.json())
      .then((data: any) => {
        setCourseId(data?.user?.course?.id ?? '');
        setValue(data?.user?.year ?? '');
        setuid(data?.user?.id ?? '');
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const handleCourseSelect = (id: string) => {
    setCourseId(id);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  const handleConfirm = async () => {
    if (!uid) {
      console.error("No user id found");
      return;
    }

    try {
      const res = await fetch(`/api/customers/${uid}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          year: value,
          course: courseId,
        }),
      });

      if (res.ok) {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div className='mt-5 mb-0'>
      <div className='grid lg:grid-cols-4 gap-5'>
        {data.docs.map((item: any, index: number) => (
          <div
            key={index}
            onClick={() => handleCourseSelect(item.id)}
            className='cursor-pointer rounded-md bg-yellow h-16 flex justify-start border-[1px] border-whitefir'
          >
            <div className='my-auto flex gap-5 ml-5'>
              <div className={`h-5 w-5 ${courseId === item.id ? 'bg-orange' : 'bg-white'} border-[1px] border-whitefir rounded-full my-auto`} />
              <h1 className='text-black text-xl my-auto'>{item.name}</h1>
            </div>
          </div>
        ))}
      </div>

      <h1 className='lg:text-2xl text-xl text-black mt-5'>
        In which year did you graduate from college?
      </h1>

      <select
        value={value}
        onChange={handleYearChange}
        id="countries"
        className="text-xl mt-5 rounded-md outline-none pr-2 pl-2 h-14 bg-yellow border-[1px] border-whitefir"
      >
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
        <option value="2019">2019</option>
        <option value="2018">2018</option>
      </select>

      <div
        onClick={handleConfirm}
        className='cursor-pointer mt-10 mb-10 text-white rounded-md flex justify-center pl-3 pr-3 pt-2 pb-2 bg-orange w-min text-xl'
      >
        <h1>Confirm</h1>
      </div>
    </div>
  );
}
