import { useState, useEffect } from 'react';

function MealPlanner({ favoriteRecipes, onClose }) {
  const [mealPlan, setMealPlan] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [showRecipePicker, setShowRecipePicker] = useState(false);
  const [customEvent, setCustomEvent] = useState('');

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

  // Add recipe to day
  const addRecipeToDay = (recipe) => {
    if (!selectedDay) return;
    const dateKey = formatDateKey(selectedDay);
    const dayEvents = mealPlan[dateKey] || [];
    const newPlan = {
      ...mealPlan,
      [dateKey]: [...dayEvents, { type: 'recipe', title: recipe.title, id: recipe.id }],
    };
    saveMealPlan(newPlan);
    setShowRecipePicker(false);
    setSelectedDay(null);
  };

  // Add custom event to day
  const addCustomEvent = () => {
    if (!selectedDay || !customEvent.trim()) return;
    const dateKey = formatDateKey(selectedDay);
    const dayEvents = mealPlan[dateKey] || [];
    const newPlan = {
      ...mealPlan,
      [dateKey]: [...dayEvents, { type: 'event', title: customEvent.trim() }],
    };
    saveMealPlan(newPlan);
    setCustomEvent('');
    setSelectedDay(null);
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
                    <span>{event.title}</span>
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
                  setShowRecipePicker(false);
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
        <div className="modal-overlay" onClick={() => setSelectedDay(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Add to {formatDateDisplay(selectedDay)}</h3>

            {/* Custom event input */}
            <div className="modal-section">
              <label>Add Custom Event</label>
              <div className="custom-event-input">
                <input
                  type="text"
                  value={customEvent}
                  onChange={(e) => setCustomEvent(e.target.value)}
                  placeholder="e.g., Dinner with friends"
                  onKeyDown={(e) => e.key === 'Enter' && addCustomEvent()}
                />
                <button className="btn-primary" onClick={addCustomEvent}>
                  Add
                </button>
              </div>
            </div>

            {/* Recipe picker */}
            <div className="modal-section">
              <label>Or Add from Favorites</label>
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
              onClick={() => setSelectedDay(null)}
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
