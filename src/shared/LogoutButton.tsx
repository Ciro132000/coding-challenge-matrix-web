import { useAuth } from "../core/auth/useAuth";

export function LogoutButton() {
    const { logout } = useAuth();

    return (
        <button
            onClick={logout}
            style={{
                background: 'transparent',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-secondary)',
                padding: '10px 20px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.25s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'inherit',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--glass-border-hover)';
                e.currentTarget.style.color = 'var(--text-primary)';
                e.currentTarget.style.background = 'var(--bg-surface)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--glass-border)';
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.background = 'transparent';
            }}
        >
            <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Cerrar sesión
        </button>
    );
}