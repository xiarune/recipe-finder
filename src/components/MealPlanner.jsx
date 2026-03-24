import { useState, useEffect } from 'react';

function MealPlanner({ favoriteRecipes, onClose }) {
  const [mealPlan, setMealPlan] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [customEvent, setCustomEvent] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');

  // Get current week's dates
  const getWeekDates = () => {
    const today = new Date();
    const week = [];
    const dayOfWeek = today.getDay();
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - dayOfWeek);

    for (let i = 0; i < 7; i++) {
      const date = new Date(sunday);
      date.setDate(sunday.getDate() + i);
      week.push(date);
    }
    return week;
  };

  const weekDates = getWeekDates();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Load meal plan from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('mealPlan');
    if (stored) {
      setMealPlan(JSON.parse(stored));
    }
  }, []);

  // Save meal plan to localStorage
  const saveMealPlan = (newPlan) => {
    setMealPlan(newPlan);
    localStorage.setItem('mealPlan', JSON.stringify(newPlan));
  };

  // Format date as key
  const formatDateKey = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Format date for display
  const formatDateDisplay = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Format time for display (convert 24h to 12h)
  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Reset form fields
  const resetForm = () => {
    setCustomEvent('');
    setEventTime('');
    setEventLocation('');
    setSelectedDay(null);
  };

  // Add recipe to day
  const addRecipeToDay = (recipe) => {
    if (!selectedDay) return;
    const dateKey = formatDateKey(selectedDay);
    const dayEvents = mealPlan[dateKey] || [];
    const newPlan = {
      ...mealPlan,
      [dateKey]: [
        ...dayEvents,
        {
          type: 'recipe',
          title: recipe.title,
          id: recipe.id,
          time: eventTime || null,
        },
      ],
    };
    saveMealPlan(newPlan);
    resetForm();
  };

  // Add custom event to day
  const addCustomEvent = () => {
    if (!selectedDay || !customEvent.trim()) return;
    const dateKey = formatDateKey(selectedDay);
    const dayEvents = mealPlan[dateKey] || [];
    const newPlan = {
      ...mealPlan,
      [dateKey]: [
        ...dayEvents,
        {
          type: 'event',
          title: customEvent.trim(),
          time: eventTime || null,
          location: eventLocation.trim() || null,
        },
      ],
    };
    saveMealPlan(newPlan);
    resetForm();
  };

  // Remove event from day
  const removeEvent = (dateKey, index) => {
    const dayEvents = [...(mealPlan[dateKey] || [])];
    dayEvents.splice(index, 1);
    const newPlan = { ...mealPlan, [dateKey]: dayEvents };
    saveMealPlan(newPlan);
  };

  // Check if date is today
  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="meal-planner">
      <div className="meal-planner-header">
        <h2>Plan Your Week</h2>
        <button className="btn-secondary" onClick={onClose}>
          Back
        </button>
      </div>

      <div className="calendar-week">
        {weekDates.map((date, index) => {
          const dateKey = formatDateKey(date);
          const events = mealPlan[dateKey] || [];

          return (
            <div
              key={dateKey}
              className={`calendar-day ${isToday(date) ? 'today' : ''}`}
            >
              <div className="calendar-day-header">
                <span className="day-name">{dayNames[index]}</span>
                <span className="day-date">{formatDateDisplay(date)}</span>
              </div>

              <div className="calendar-day-events">
                {events.map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    className={`calendar-event ${event.type}`}
                  >
                    <div className="event-content">
                      <span className="event-title">{event.title}</span>
                      {event.time && (
                        <span className="event-time">{formatTime(event.time)}</span>
                      )}
                      {event.location && (
                        <span className="event-location">📍 {event.location}</span>
                      )}
                    </div>
                    <button
                      className="remove-event"
                      onClick={() => removeEvent(dateKey, eventIndex)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <button
                className="add-to-day"
                onClick={() => {
                  setSelectedDay(date);
                }}
              >
                + Add
              </button>
            </div>
          );
        })}
      </div>

      {/* Add event modal */}
      {selectedDay && (
        <div className="modal-overlay" onClick={resetForm}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Add to {formatDateDisplay(selectedDay)}</h3>

            {/* Custom event input */}
            <div className="modal-section">
              <label>Event Title *</label>
              <input
                type="text"
                value={customEvent}
                onChange={(e) => setCustomEvent(e.target.value)}
                placeholder="e.g., Dinner with friends"
                className="modal-input"
              />
            </div>

            <div className="modal-row">
              <div className="modal-section half">
                <label>Time</label>
                <input
                  type="time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  className="modal-input"
                />
              </div>

              <div className="modal-section half">
                <label>Location</label>
                <input
                  type="text"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  placeholder="e.g., Home"
                  className="modal-input"
                />
              </div>
            </div>

            <button
              className="btn-primary full-width"
              onClick={addCustomEvent}
              disabled={!customEvent.trim()}
            >
              Add Event
            </button>

            {/* Recipe picker */}
            <div className="modal-section">
              <label>Or Add from Favorite Recipes</label>
              {favoriteRecipes.length === 0 ? (
                <p className="no-favorites">No favorite recipes yet.</p>
              ) : (
                <div className="recipe-picker">
                  {favoriteRecipes.map((recipe) => (
                    <button
                      key={recipe.id}
                      className="recipe-pick-btn"
                      onClick={() => addRecipeToDay(recipe)}
                    >
                      {recipe.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              className="btn-secondary modal-close"
              onClick={resetForm}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MealPlanner;
