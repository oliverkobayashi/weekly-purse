import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, PieChart, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

interface StatsOverviewProps {
  currentPlan?: any;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ currentPlan }) => {
  if (!currentPlan) return null;

  const weeklyData = currentPlan.days.map((day: any, index: number) => ({
    day: day.dayOfWeek.slice(0, 3),
    planned: parseFloat(day.dailyBudget.replace('R$ ', '').replace(',', '.')),
    spent: parseFloat(day.expenses.replace('R$ ', '').replace(',', '.')),
  }));

  const pieData = [
    { name: 'Gastos', value: currentPlan.initialBudget - currentPlan.currentBudget, color: '#ef4444' },
    { name: 'Disponível', value: currentPlan.currentBudget, color: '#22c55e' },
  ];

  const totalSpent = currentPlan.initialBudget - currentPlan.currentBudget;
  const spentPercentage = (totalSpent / currentPlan.initialBudget) * 100;
  const avgDailySpent = totalSpent / 7;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-4 mb-6"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="glass border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Gasto</p>
                <p className="text-lg font-bold text-red-500">
                  R$ {totalSpent.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {spentPercentage.toFixed(1)}% do orçamento
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                <TrendingDown className="h-4 w-4 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Média Diária</p>
                <p className="text-lg font-bold text-blue-500">
                  R$ {avgDailySpent.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Por dia
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <BarChart3 className="h-4 w-4 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="glass border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Gastos por Dia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <XAxis 
                    dataKey="day" 
                    fontSize={10}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide />
                  <Bar dataKey="spent" fill="#3b82f6" radius={2} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              Distribuição
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={20}
                    outerRadius={50}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default StatsOverview;
