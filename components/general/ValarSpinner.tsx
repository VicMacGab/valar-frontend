import { Spinner } from "baseui/spinner";

interface ValarSpinnerProps {
  size?: number;
}

const ValarSpinner: React.FC<ValarSpinnerProps> = (props) => {
  return (
    <Spinner
      size={props.size ?? 30}
      overrides={{
        ActivePath: {
          style: ({ $theme }) => ({ fill: $theme.colors.primary }),
        },
      }}
    />
  );
};

export default ValarSpinner;
