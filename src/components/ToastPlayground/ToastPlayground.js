import React, { useContext, useState } from "react";

import Button from "../Button";

import { ToastContext } from "../ToastProvider";
import ToastShelf from "../ToastShelf/ToastShelf";
import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const { handleToastCreate } = useContext(ToastContext);
  const [selectedVariant, setSelectedVariant] = useState(
    VARIANT_OPTIONS[0]
  );
  const [message, setMessage] = useState("");

  function handleToastSubmit(e) {
    e.preventDefault();

    handleToastCreate(selectedVariant, message);

    setMessage("");
    setSelectedVariant(VARIANT_OPTIONS[0]);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt='Cute toast mascot' src='/toast.png' />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf />

      <form
        className={styles.controlsWrapper}
        onSubmit={handleToastSubmit}
      >
        <div className={styles.row}>
          <label
            htmlFor='message'
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id='message'
              className={styles.messageInput}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </div>
        </div>

        {/* RADIO BUTTON */}

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            {VARIANT_OPTIONS.map((variant, i) => {
              const id = `variant-${variant}`;
              return (
                <label htmlFor={id} key={id}>
                  <input
                    id={id}
                    type='radio'
                    name='variant'
                    value={variant}
                    checked={selectedVariant === variant}
                    onChange={(e) => {
                      setSelectedVariant(e.target.value);
                    }}
                  />
                  {variant}
                </label>
              );
            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
