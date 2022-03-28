import { useState } from "react";
import Section from "../Section";
import FeedbackOptions from "../FeedbackOptions";
import Statistics from "../Statistics/Statistics";
import Notification from "../Notification";
import { Wrapper } from "./App.styled";

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const options = ["good", "neutral", "bad"];

  const leaveFeedback = (key) => {
    switch (key) {
      case "good":
        setGood((prevState) => prevState + 1);
        break;

      case "neutral":
        setNeutral((prevState) => prevState + 1);
        break;

      case "bad":
        setBad((prevState) => prevState + 1);
        break;

      default:
        return;
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    return Math.round((Number(good) / countTotalFeedback()) * 100);
  };

  return (
    <Wrapper>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={options}
          onLeaveFeedback={leaveFeedback}
        ></FeedbackOptions>
      </Section>
      <Section title="Statistics">
        {countTotalFeedback() > 0 && (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          ></Statistics>
        )}
        {countTotalFeedback() === 0 && (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </Wrapper>
  );
}
