import React, { useState, useEffect } from 'react';
import { useStore } from '../../store';
import { BarChart, LineChart, AreaChart } from 'lucide-react';
import type { SystemLog, ApiResponse } from '../../types';
import { admin } from '../../lib/api';

interface ChartCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, value, icon, color }) => (
  <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow border-l-4 ${color}`}>
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold">{title}</h3>
      {icon}
    </div>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

export default function AdminDashboard() {
  const { metrics: metricsData } = useStore();
  const [logs, setLogs] = useState<SystemLog[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await admin.getLogs();
        if ('data' in response) {
          setLogs((response as ApiResponse<SystemLog[]>).data);
        }
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="space-y-6">
      {/* Metrics Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ChartCard
            title="Total Users"
            value={metricsData?.totalUsers || 0}
            icon={<BarChart className="h-6 w-6 text-blue-500" />}
            color="border-blue-500"
          />
          <ChartCard
            title="Total Messages"
            value={metricsData?.totalMessages || 0}
            icon={<LineChart className="h-6 w-6 text-green-500" />}
            color="border-green-500"
          />
          <ChartCard
            title="Response Time"
            value={metricsData?.averageResponseTime || '0s'}
            icon={<AreaChart className="h-6 w-6 text-orange-500" />}
            color="border-orange-500"
          />
          <ChartCard
            title="Resolution Rate"
            value={metricsData?.resolutionRate || '0%'}
            icon={<AreaChart className="h-6 w-6 text-purple-500" />}
            color="border-purple-500"
          />
        </div>
      </section>

      {/* Logs Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">System Logs</h2>
        <div className="space-y-4">
          {logs.map((log) => (
            <div
              key={log.id}
              className={`p-4 mb-2 ${
                log.level === 'error'
                  ? 'bg-red-50 border-l-4 border-red-500'
                  : log.level === 'warn'
                  ? 'bg-yellow-50 border-l-4 border-yellow-500'
                  : 'bg-blue-50 border-l-4 border-blue-500'
              }`}
            >
              <p className="text-sm">{log.message}</p>
              <span className="text-xs text-gray-500">{log.timestamp}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}