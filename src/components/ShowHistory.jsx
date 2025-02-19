import { Progress } from "@heroui/react";
import React from "react";

const ShowHistory = ({ showHistory, quizHistory }) => {
  return (
    <>
      {showHistory && (
        <div className="w-full mb-8 border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3">Attempt History</h2>
          {quizHistory.length === 0 ? (
            <p className="text-gray-500">No attempts yet</p>
          ) : (
            <div className="space-y-3">
              {quizHistory.map((attempt) => (
                <div key={attempt.id} className="border-b pb-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Attempt #{attempt.id}</span>
                    <span className="text-sm text-gray-500">
                      {attempt.date}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span>
                      Score: {attempt.score}/{attempt.total}
                    </span>
                    <Progress
                      value={parseFloat(attempt.percentage)}
                      color={
                        parseFloat(attempt.percentage) >= 70
                          ? "success"
                          : "warning"
                      }
                      className="w-48"
                    />
                    <span className="font-medium">{attempt.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShowHistory;
