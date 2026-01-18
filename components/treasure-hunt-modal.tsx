"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle, Circle, Trophy, Zap, Clock, X } from "lucide-react"

interface TreasureHuntModalProps {
  isOpen: boolean
  onClose: () => void
  hunt: {
    id: number
    title: string
    description: string
    difficulty: string
    duration: string
    xpReward: number
    culturalPoints: number
    tasks: string[]
  }
}

export default function TreasureHuntModal({ isOpen, onClose, hunt }: TreasureHuntModalProps) {
  const [currentTask, setCurrentTask] = useState(0)
  const [completedTasks, setCompletedTasks] = useState<boolean[]>(new Array(hunt.tasks.length).fill(false))
  const [isCompleted, setIsCompleted] = useState(false)

  const completeTask = (taskIndex: number) => {
    const newCompleted = [...completedTasks]
    newCompleted[taskIndex] = true
    setCompletedTasks(newCompleted)

    if (taskIndex === hunt.tasks.length - 1) {
      setIsCompleted(true)
    } else {
      setCurrentTask(taskIndex + 1)
    }
  }

  const progress = (completedTasks.filter(Boolean).length / hunt.tasks.length) * 100

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="font-serif text-2xl">{hunt.title}</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Hunt Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge
                className={`${
                  hunt.difficulty === "Beginner"
                    ? "bg-green-500"
                    : hunt.difficulty === "Intermediate"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                } text-white`}
              >
                {hunt.difficulty}
              </Badge>
              <div className="flex items-center text-muted-foreground">
                <Clock className="w-4 h-4 mr-1" />
                {hunt.duration}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Zap className="w-4 h-4 text-accent mr-1" />
                <span className="font-medium">{hunt.xpReward} XP</span>
              </div>
              <div className="flex items-center">
                <Trophy className="w-4 h-4 text-accent mr-1" />
                <span className="font-medium">{hunt.culturalPoints} CP</span>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">
                {completedTasks.filter(Boolean).length}/{hunt.tasks.length} tasks
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Tasks */}
          <div className="space-y-4">
            {hunt.tasks.map((task, index) => (
              <Card
                key={index}
                className={`${
                  index === currentTask && !completedTasks[index]
                    ? "border-primary"
                    : completedTasks[index]
                      ? "bg-green-50 border-green-200"
                      : "bg-muted/30"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {completedTasks[index] ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground" />
                      )}
                      <span
                        className={`${
                          completedTasks[index]
                            ? "text-green-700 line-through"
                            : index === currentTask
                              ? "font-medium"
                              : "text-muted-foreground"
                        }`}
                      >
                        {task}
                      </span>
                    </div>
                    {index === currentTask && !completedTasks[index] && (
                      <Button size="sm" onClick={() => completeTask(index)}>
                        Complete
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Completion */}
          {isCompleted && (
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-6 text-center">
                <Trophy className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-serif font-semibold text-xl mb-2">Hunt Completed!</h3>
                <p className="text-muted-foreground mb-4">
                  Congratulations! You've successfully completed the {hunt.title} treasure hunt.
                </p>
                <div className="flex items-center justify-center space-x-6 mb-4">
                  <div className="text-center">
                    <div className="font-bold text-primary">+{hunt.xpReward}</div>
                    <div className="text-sm text-muted-foreground">XP Earned</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-primary">+{hunt.culturalPoints}</div>
                    <div className="text-sm text-muted-foreground">Cultural Points</div>
                  </div>
                </div>
                <Button onClick={onClose} className="w-full">
                  Claim Rewards
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
