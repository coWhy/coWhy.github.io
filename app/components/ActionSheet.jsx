import React from 'react';

export default function ActionSheet({ visible, actions, onSelect, onCancel, title }) {
  if (!visible) return null;

  return (
    <>
      <div className="van-overlay" style={{ zIndex: 2000 }} onClick={onCancel}></div>
      <div className="van-popup van-popup--bottom van-popup--round van-action-sheet" style={{ zIndex: 2001, background: '#2c2c2e' }}>
        {title && (
            <div className="van-action-sheet__header" style={{ color: '#f5f5f5', borderBottom: '1px solid #3a3a3c' }}>
                {title}
                <div className="van-icon van-icon-cross van-action-sheet__close" onClick={onCancel}></div>
            </div>
        )}
        <div className="van-action-sheet__content">
            {actions.map((action, index) => (
                <button 
                    key={index} 
                    type="button" 
                    className={`van-action-sheet__item ${action.className || ''}`}
                    style={{ 
                        color: action.color || '#f5f5f5', 
                        background: '#2c2c2e',
                        borderBottom: index < actions.length - 1 ? '1px solid #3a3a3c' : 'none'
                    }}
                    onClick={() => onSelect(action)}
                    disabled={action.disabled}
                >
                    <span className="van-action-sheet__name">{action.name}</span>
                    {action.subname && <div className="van-action-sheet__subname">{action.subname}</div>}
                </button>
            ))}
        </div>
        <div className="van-action-sheet__gap" style={{ height: '8px', background: '#000' }}></div>
        <button 
            type="button" 
            className="van-action-sheet__cancel" 
            style={{ color: '#f5f5f5', background: '#2c2c2e' }}
            onClick={onCancel}
        >
            取消
        </button>
      </div>
    </>
  );
}
