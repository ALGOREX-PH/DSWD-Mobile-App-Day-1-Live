import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';

type Task = {
  id: string;
  title: string;
  time?: string;
  priority?: 'Low' | 'Medium' | 'High';
  category?: string;
  section: 'Today' | 'Overdue' | 'Upcoming' | 'Completed';
};

const tasks: Task[] = [
  { id: '1', title: 'Finalize project proposal', time: '2:00 PM', priority: 'High', category: 'Work', section: 'Today' },
  { id: '2', title: 'Call with design team', time: '4:30 PM', priority: 'Medium', category: 'Meeting', section: 'Today' },
  { id: '3', title: 'Grocery shopping', time: 'Evening', priority: 'Low', category: 'Personal', section: 'Today' },
  { id: '4', title: 'Submit quarterly report', time: 'Yesterday', priority: 'High', category: 'Work', section: 'Overdue' },
  { id: '5', title: 'Team retrospective meeting', time: 'Tomorrow, 10:00 AM', priority: 'Medium', category: 'Meeting', section: 'Upcoming' },
  { id: '6', title: 'Prepare presentation slides', time: 'In 2 days', priority: 'Medium', category: 'Work', section: 'Upcoming' },
  { id: '7', title: 'Completed Task 1', section: 'Completed' },
  { id: '8', title: 'Completed Task 2', section: 'Completed' },
];

type TaskItemProps = Pick<Task, 'title' | 'time' | 'priority' | 'category'>;

const TaskItem: React.FC<TaskItemProps> = ({ title, time, priority, category }) => (
  <View style={styles.taskItem}>
    <Text style={styles.title}>{title}</Text>
    {time && <Text style={styles.detail}>⏰ {time}</Text>}
    {priority && <Text style={styles.detail}>⚡ {priority}</Text>}
    {category && <Text style={styles.detail}>📁 {category}</Text>}
  </View>
);

type TaskSectionProps = {
  title: Task['section'];
  data: Task[];
};

const TaskSection: React.FC<TaskSectionProps> = ({ title, data }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TaskItem
          title={item.title}
          time={item.time}
          priority={item.priority}
          category={item.category}
        />
      )}
    />
  </View>
);

export default function App(): JSX.Element {
  const sections: Task['section'][] = ['Today', 'Overdue', 'Upcoming', 'Completed'];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {sections.map((section) => (
        <TaskSection
          key={section}
          title={section}
          data={tasks.filter((t) => t.section === section)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#f9f9f9',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  detail: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },
});