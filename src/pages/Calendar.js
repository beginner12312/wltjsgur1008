import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/ko"; // 한국어 로케일 추가
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/Calendar.css"; // 스타일 파일 추가
import axios from "axios";
import { Link } from "react-router-dom";

moment.locale("ko"); // moment의 로케일을 한국어로 설정

const localizer = momentLocalizer(moment);

const messages = {
  allDay: "종일",
  previous: "이전",
  next: "다음",
  today: "오늘",
  month: "월",
  week: "주",
  day: "일",
  agenda: "일정",
  date: "날짜",
  time: "시간",
  event: "이벤트",
  noEventsInRange: "해당 범위 내 이벤트가 없습니다.",
  showMore: (total) => `+${total} 더 보기`,
};

const MyCalendar = ({ token }) => {
  const [events, setEvents] = useState([]);

  const fetchEvents = () => {
    axios
      .get("http://localhost:8000/api/calendar/events", {
        withCredentials: true,
      })
      .then((response) => {
        const fetchedEvents = response.data.map((event) => ({
          id: event.id, // 이벤트 ID 추가
          title: event.title,
          start: new Date(event.start),
          end: new Date(event.end),
          color: event.color || '#007bff', // 기본 색상 추가
        }));
        setEvents(fetchedEvents);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  };

  const handleEventClick = async (event) => {
    if (window.confirm("삭제하시겠습니까?")) {
      try {
        await axios.delete(`http://localhost:8000/api/calendar/${event.id}`, {
          withCredentials: true,
        });
        fetchEvents(); // 삭제 후 이벤트 다시 불러오기
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  useEffect(() => {
    if (token) {
      fetchEvents();
    } else {
      setEvents([]);
    }
  }, [token]);

  const eventStyleGetter = (event) => {
    const backgroundColor = event.color;
    const style = {
      backgroundColor,
      borderRadius: '4px',
      opacity: 0.8,
      color: 'black',
      border: '0px',
      display: 'block',
    };
    return {
      style,
    };
  };

  return (
    <div className="calendar-container form-style">
      <div className="calendar-header">
        <h2>일정관리 캘린더</h2>
        <Link to="/add-event" className="btn-add-event">
          일정 추가
        </Link>
      </div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700 }}
        messages={messages}
        onSelectEvent={handleEventClick} // 이벤트 클릭 시 처리 함수 추가
        eventPropGetter={eventStyleGetter} // 이벤트 스타일 적용
      />
    </div>
  );
};

export default MyCalendar;
