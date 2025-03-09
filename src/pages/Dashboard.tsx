import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Users, DollarSign, CheckSquare, Plus, Trash, Check } from 'lucide-react';
import Calendar from '../components/Calendar/Calendar';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ icon: Icon, title, value, prefix = '' }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="card"
  >
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <p className="text-gray-400 text-sm">{title}</p>
        <h3 className="text-2xl font-bold text-white">{prefix}{value}</h3>
      </div>
      <div className="bg-gray-800/50 p-3 rounded-lg">
        <Icon className="h-6 w-6 text-gold-400" />
      </div>
    </div>
  </motion.div>
);

const TaskCard = ({ task, onComplete, onDelete }: { task: any; onComplete: () => void; onDelete: () => void }) => (
  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg group">
    <div className="min-w-0 flex items-center gap-3">
      <button
        onClick={onComplete}
        className={`p-1 rounded-full transition-colors ${
          task.statut === 'terminé' 
            ? 'bg-green-500 text-white hover:bg-green-600' 
            : 'text-gray-400 hover:text-white hover:bg-gray-700'
        }`}
      >
        <Check className="h-4 w-4" />
      </button>
      <div>
        <h3 className={`font-semibold truncate ${task.statut === 'terminé' ? 'line-through text-gray-500' : ''}`}>
          {task.titre}
        </h3>
        <p className="text-sm text-gray-400 truncate">Échéance: {task.deadline}</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <span className={`px-2 py-1 text-xs font-semibold ${task.urgent ? 'bg-gold-500 text-gray-900' : 'bg-gray-700 text-gray-100'} rounded whitespace-nowrap`}>
        {task.status}
      </span>
      <button
        onClick={onDelete}
        className="p-1 text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash className="h-4 w-4" />
      </button>
    </div>
  </div>
);

const UpcomingEvent = ({ event }: { event: any }) => (
  <div className="flex items-start gap-4 p-3 bg-gray-800/50 rounded-lg">
    <div className="min-w-[64px] text-center">
      <div className="text-2xl font-bold text-gold-400">{event.day}</div>
      <div className="text-sm text-gray-400">{event.month}</div>
    </div>
    <div className="min-w-0 flex-1">
      <h3 className="font-semibold truncate">{event.title}</h3>
      <p className="text-sm text-gray-400 truncate">{event.location}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {event.artists.map((artist: string, index: number) => (
          <span key={index} className="text-xs bg-gray-700 px-2 py-1 rounded">
            {artist}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState([
    { icon: CalendarIcon, title: 'Événements à venir', value: '0' },
    { icon: Users, title: 'Artistes actifs', value: '0' },
    { icon: DollarSign, title: 'Budget mensuel', value: '0', prefix: '€' },
    { icon: CheckSquare, title: 'Tâches en cours', value: '0' },
  ]);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [priorityTasks, setPriorityTasks] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [newTask, setNewTask] = useState({
    titre: '',
    description: '',
    priorite: 'haute',
    dateEchéance: new Date().toISOString().split('T')[0],
    assignéÀ: ''
  });

  const loadData = () => {
    const artistes = getFromLocalStorage<any[]>('artistes', []);
    const evenements = getFromLocalStorage<any[]>('evenements', []);
    const tasks = getFromLocalStorage<any[]>('tasks', []);
    const transactions = getFromLocalStorage<any[]>('transactions', []);

    setStats([
      { 
        icon: CalendarIcon, 
        title: 'Événements à venir', 
        value: evenements.filter(e => new Date(e.date) > new Date()).length.toString()
      },
      { 
        icon: Users, 
        title: 'Artistes actifs', 
        value: artistes.length.toString()
      },
      { 
        icon: DollarSign, 
        title: 'Budget mensuel', 
        value: transactions.length > 0 ? 
          (transactions.reduce((sum, t) => sum + t.montant, 0) / 1000).toFixed(1) + 'K' : 
          '0', 
        prefix: '€'
      },
      { 
        icon: CheckSquare, 
        title: 'Tâches en cours', 
        value: tasks.filter(t => t.statut === 'en_cours').length.toString()
      },
    ]);

    const formattedEvents = evenements
      .filter(e => new Date(e.date) > new Date())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 2)
      .map(e => {
        const date = new Date(e.date);
        return {
          day: date.getDate().toString(),
          month: date.toLocaleDateString('fr-FR', { month: 'long' }),
          title: e.titre,
          location: e.lieu,
          artists: e.artistes
        };
      });
    setUpcomingEvents(formattedEvents);

    const formattedTasks = tasks
      .filter(t => t.priorite === 'haute' && t.statut !== 'terminé')
      .slice(0, 3)
      .map(t => ({
        id: t.id,
        titre: t.titre,
        deadline: new Date(t.dateEchéance).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
        status: t.statut.replace('_', ' ').toUpperCase(),
        urgent: t.priorite === 'haute',
        statut: t.statut
      }));
    setPriorityTasks(formattedTasks);

    const calendarEvents = evenements.map(evt => ({
      id: evt.id,
      title: evt.titre,
      date: new Date(evt.date),
      type: 'event'
    }));
    setEvents(calendarEvents);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddTask = () => {
    const tasks = getFromLocalStorage<any[]>('tasks', []);
    const task = {
      id: Date.now().toString(),
      ...newTask,
      dateEchéance: selectedDate ? selectedDate.toISOString().split('T')[0] : newTask.dateEchéance,
      statut: 'à_faire'
    };
    
    saveToLocalStorage('tasks', [...tasks, task]);
    setIsNewTaskModalOpen(false);
    setNewTask({
      titre: '',
      description: '',
      priorite: 'haute',
      dateEchéance: new Date().toISOString().split('T')[0],
      assignéÀ: ''
    });
    setSelectedDate(null);
    loadData();
  };

  const handleCompleteTask = (taskId: string) => {
    const tasks = getFromLocalStorage<any[]>('tasks', []);
    const updatedTasks = tasks.map(task => 
      task.id === taskId
        ? { ...task, statut: task.statut === 'terminé' ? 'à_faire' : 'terminé' }
        : task
    );
    saveToLocalStorage('tasks', updatedTasks);
    loadData();
  };

  const handleDeleteTask = (taskId: string) => {
    const tasks = getFromLocalStorage<any[]>('tasks', []);
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    saveToLocalStorage('tasks', updatedTasks);
    loadData();
  };

  const handleCalendarAddEvent = (date: Date) => {
    navigate('/evenements', { state: { selectedDate: date } });
  };

  const handleCalendarAddTask = (date: Date) => {
    setSelectedDate(date);
    setNewTask(prev => ({
      ...prev,
      dateEchéance: date.toISOString().split('T')[0]
    }));
    setIsNewTaskModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Tableau de bord</h1>
        <div className="flex gap-2">
          <button 
            className="btn-secondary flex items-center gap-2"
            onClick={() => setIsNewTaskModalOpen(true)}
          >
            <Plus className="h-5 w-5" />
            Nouvelle tâche
          </button>
          <button 
            className="btn-primary flex items-center gap-2"
            onClick={() => navigate('/evenements')}
          >
            <Plus className="h-5 w-5" />
            Nouvel événement
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold text-white mb-4">Événements à venir</h2>
            <div className="space-y-4">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event, index) => (
                  <UpcomingEvent key={index} event={event} />
                ))
              ) : (
                <p className="text-gray-400">Aucun événement à venir</p>
              )}
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold text-white mb-4">Tâches prioritaires</h2>
            <div className="space-y-4">
              {priorityTasks.length > 0 ? (
                priorityTasks.map((task) => (
                  <TaskCard 
                    key={task.id} 
                    task={task}
                    onComplete={() => handleCompleteTask(task.id)}
                    onDelete={() => handleDeleteTask(task.id)}
                  />
                ))
              ) : (
                <p className="text-gray-400">Aucune tâche prioritaire</p>
              )}
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-white mb-4">Calendrier des événements</h2>
          <Calendar 
            events={events} 
            onAddEvent={handleCalendarAddEvent}
            onAddTask={handleCalendarAddTask}
          />
        </div>
      </div>

      {/* New Task Modal */}
      <Modal
        isOpen={isNewTaskModalOpen}
        onClose={() => {
          setIsNewTaskModalOpen(false);
          setSelectedDate(null);
        }}
        title="Nouvelle tâche"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Titre
            </label>
            <input
              type="text"
              className="input w-full"
              value={newTask.titre}
              onChange={(e) => setNewTask({ ...newTask, titre: e.target.value })}
              placeholder="Titre de la tâche"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Description
            </label>
            <textarea
              className="input w-full h-24 resize-none"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              placeholder="Description de la tâche"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Assigné à
            </label>
            <input
              type="text"
              className="input w-full"
              value={newTask.assignéÀ}
              onChange={(e) => setNewTask({ ...newTask, assignéÀ: e.target.value })}
              placeholder="Nom de la personne"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Date d'échéance
            </label>
            <input
              type="date"
              className="input w-full"
              value={newTask.dateEchéance}
              onChange={(e) => setNewTask({ ...newTask, dateEchéance: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              className="btn-secondary"
              onClick={() => {
                setIsNewTaskModalOpen(false);
                setSelectedDate(null);
              }}
            >
              Annuler
            </button>
            <button
              className="btn-primary"
              onClick={handleAddTask}
            >
              Créer la tâche
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;