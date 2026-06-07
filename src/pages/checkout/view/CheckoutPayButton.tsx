import React from "react";
import { Lock } from "lucide-react";
import Button from "@cyopo/Components/button/Button";
import { CHECKOUT_PAY_LABEL } from "../Checkout.constants";

interface Props {
  total: number;
  isPaying: boolean;
  formatPrice: (amount: number) => string;
  onPay: () => void;
}

const CheckoutPayButton: React.FC<Props> = ({ total, isPaying, formatPrice, onPay }) => (
  <div className='flex flex-col gap-3'>
    <Button
      variant='primary'
      size='lg'
      fullWidth
      onClick={onPay}
      loading={isPaying}
      disabled={isPaying}
      leftIcon={<Lock size={15} />}
      className='shadow-md'>
      {total === 0 ? "Activate for free" : `${CHECKOUT_PAY_LABEL} ${formatPrice(total)}`}
    </Button>

    <div className='flex items-center justify-center gap-4'>
      {["visa", "mastercard", "upi", "rupay"].map((method) => (
        <span key={method} className='text-[10px] font-bold uppercase text-on-surface-variant/50 tracking-wider'>
          {method}
        </span>
      ))}
    </div>
  </div>
);

export default CheckoutPayButton;
