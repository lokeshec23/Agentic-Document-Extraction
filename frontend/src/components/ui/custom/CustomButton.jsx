import { Button } from "@/components/ui/button";
const CustomButton = ({ children, className, ...props }) => {
  return (
    <Button className={className} {...props}>
      {children}
    </Button>
  );
};
export default CustomButton;
