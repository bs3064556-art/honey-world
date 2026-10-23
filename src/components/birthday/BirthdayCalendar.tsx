import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { CONFIG } from '../../data/birthdayContent';
import './BirthdayCalendar.css';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

interface BirthdayCalendarProps {
  /** called when user taps the birthday date (2 Nov) */
  onBirthdayClick?: () => void;
  /** highlight that the date is tappable */
  interactive?: boolean;
}

/** A little tear-off wall calendar with the birthday circled + days-left countdown. */
export const BirthdayCalendar: React.FC<BirthdayCalendarProps> = ({ onBirthdayClick, interactive }) => {
  const info = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let year = today.getFullYear();
    let birthday = new Date(year, CONFIG.birthdayMonth, CONFIG.birthdayDay);
    if (birthday < today) {
      year += 1;
      birthday = new Date(year, CONFIG.birthdayMonth, CONFIG.birthdayDay);
    }
    const daysLeft = Math.round((birthday.getTime() - today.getTime()) / 86_400_000);
    const firstWeekday = new Date(year, CONFIG.birthdayMonth, 1).getDay();
    const daysInMonth = new Date(year, CONFIG.birthdayMonth + 1, 0).getDate();
    const birthdayWeekday = birthday.toLocaleDateString('en-IN', { weekday: 'long' });
    return { today, year, daysLeft, firstWeekday, daysInMonth, birthdayWeekday };
  }, []);

  const { today, year, daysLeft, firstWeekday, daysInMonth, birthdayWeekday } = info;
  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const isTodayInMonth = today.getFullYear() === year && today.getMonth() === CONFIG.birthdayMonth;

  const countdown =
    daysLeft === 0
      ? "Today is Honey's birthday! 🎉🎂"
      : daysLeft === 1
        ? "Just 1 day left! Tomorrow is Honey's birthday! 🥳"
        : `Only ${daysLeft} days left! 🎈`;

  return (
    <motion.div
      className={`bday-calendar ${interactive ? 'is-interactive' : ''}`}
      initial={{ opacity: 0, y: 16, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: -1 }}
      transition={{ duration: 0.6 }}
      aria-label={`Calendar: birthday on ${CONFIG.birthdayDate} ${year}`}
    >
      <div className="bday-cal-rings" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => <span key={i} />)}
      </div>

      <div className="bday-cal-header">
        <span className="bday-cal-month">{MONTH_NAMES[CONFIG.birthdayMonth]}</span>
        <span className="bday-cal-year">{year}</span>
      </div>

      <div className="bday-cal-grid" role="grid">
        {WEEKDAYS.map(d => (
          <span key={d} className="bday-cal-weekday">{d}</span>
        ))}
        {cells.map((day, i) => {
          if (day === null) return <span key={`e${i}`} />;
          const isBirthday = day === CONFIG.birthdayDay;
          const isToday = isTodayInMonth && day === today.getDate();
          const isPast = isTodayInMonth && day < today.getDate();

          if (isBirthday && onBirthdayClick) {
            return (
              <button
                key={day}
                type="button"
                className={[
                  'bday-cal-day',
                  'is-birthday',
                  'is-clickable',
                  isToday ? 'is-today' : '',
                ].join(' ')}
                onClick={onBirthdayClick}
                aria-label={`${day} November — tap for birthday surprise`}
              >
                <b>{day}</b>
                <i aria-hidden="true">🎂</i>
              </button>
            );
          }

          return (
            <span
              key={day}
              className={[
                'bday-cal-day',
                isBirthday ? 'is-birthday' : '',
                isToday ? 'is-today' : '',
                isPast ? 'is-past' : '',
              ].join(' ')}
              aria-label={isBirthday ? `${day} — Honey's birthday` : undefined}
            >
              {isBirthday ? (
                <>
                  <b>{day}</b>
                  <i aria-hidden="true">🎂</i>
                </>
              ) : (
                day
              )}
            </span>
          );
        })}
      </div>

      <p className="bday-cal-note font-hand">
        📅 {CONFIG.birthdayDate} · since {CONFIG.birthYear}
      </p>
      <p className="bday-cal-countdown">
        {interactive
          ? `Tap the glowing date — ${birthdayWeekday} vibes! 🎂✨`
          : countdown}
      </p>
    </motion.div>
  );
};
