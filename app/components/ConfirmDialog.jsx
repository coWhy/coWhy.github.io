import React from 'react';

export default function ConfirmDialog({ visible, title, message, onConfirm, onCancel, showCancel = true, confirmText = '确认', cancelText = '取消' }) {
  if (!visible) return null;

  return (
    <>
      <div className="van-overlay" style={{ zIndex: 2000 }}></div>
      <div 
        className="van-popup van-popup--center van-dialog" 
        style={{ zIndex: 2001, width: '320px', background: '#1c1c1e', borderRadius: '12px' }} 
        role="dialog"
      >
        {title && <div className="van-dialog__header" style={{ color: '#f5f5f5', paddingTop: '24px' }}>{title}</div>}
        <div className="van-dialog__content">
          <div className="van-dialog__message van-dialog__message--has-title" style={{ color: '#969799' }}>{message}</div>
        </div>
        <div className="van-hairline--top van-dialog__footer">
          {showCancel && (
            <button 
              className="van-button van-button--default van-button--large van-dialog__cancel"
              onClick={onCancel}
              style={{ background: '#1c1c1e', color: '#f5f5f5', borderTop: '1px solid #2c2c2e', borderRight: '1px solid #2c2c2e' }}
            >
              <div className="van-button__content">
                <span className="van-button__text">{cancelText}</span>
              </div>
            </button>
          )}
          <button 
            className="van-button van-button--default van-button--large van-dialog__confirm"
            onClick={onConfirm}
            style={{ background: '#1c1c1e', borderTop: '1px solid #2c2c2e' }}
          >
            <div className="van-button__content">
              <span className="van-button__text" style={{ color: '#1989fa' }}>{confirmText}</span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
