import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../core/auth/useAuth';
import { AuthDatasource } from '../../services/auth/AuthDataSource';

const service = new AuthDatasource();

export function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const response = await service.login(email, password);
            login(response.token);
            navigate('/matrix');
        } catch {
            setError('Credenciales inválidas');
        }
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-primary)',
                position: 'relative',
                overflow: 'hidden',
                fontFamily: "'Inter', sans-serif",
            }}
        >
            {/* Scoped focus styles */}
            <style>{`
                .login-input:focus {
                    border-color: var(--accent-mid) !important;
                    box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.15) !important;
                }
                .login-input::placeholder {
                    color: var(--text-muted);
                }
                .login-btn:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 8px 25px rgba(168, 85, 247, 0.25) !important;
                }
                .login-btn:active {
                    transform: translateY(0px);
                }
            `}</style>

            {/* Decorative background orb 1 — top-left purple */}
            <div
                style={{
                    position: 'absolute',
                    top: '-15%',
                    left: '-10%',
                    width: '550px',
                    height: '550px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(124, 58, 237, 0.18) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    pointerEvents: 'none',
                }}
            />

            {/* Decorative background orb 2 — bottom-right pink */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '-20%',
                    right: '-8%',
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    pointerEvents: 'none',
                }}
            />

            {/* Decorative background orb 3 — center-bottom accent */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '30%',
                    width: '350px',
                    height: '350px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    pointerEvents: 'none',
                }}
            />

            {/* Glass card */}
            <form
                onSubmit={onSubmit}
                style={{
                    width: '100%',
                    maxWidth: '420px',
                    padding: '48px',
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(var(--glass-blur))',
                    WebkitBackdropFilter: 'blur(var(--glass-blur))',
                    border: '1px solid var(--glass-border)',
                    borderRadius: 'var(--radius-xl)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.03) inset',
                    animation: 'slideUp 0.6s var(--ease-out)',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                {/* Logo area */}
                <div
                    style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--accent-start), var(--accent-mid), var(--accent-end))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px',
                        boxShadow: '0 4px 20px rgba(168, 85, 247, 0.3)',
                    }}
                >
                    <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ color: 'white' }}
                    >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                </div>

                {/* Title */}
                <h1
                    style={{
                        fontSize: '1.75rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        textAlign: 'center',
                        marginBottom: '8px',
                        marginTop: 0,
                        lineHeight: 1.2,
                    }}
                >
                    Iniciar Sesión
                </h1>

                {/* Subtitle */}
                <p
                    style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-muted)',
                        textAlign: 'center',
                        marginBottom: '32px',
                        marginTop: 0,
                        lineHeight: 1.5,
                    }}
                >
                    Ingresa tus credenciales para continuar
                </p>

                {/* Email field */}
                <div style={{ marginBottom: '20px' }}>
                    <label
                        style={{
                            display: 'block',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            color: 'var(--text-secondary)',
                            marginBottom: '6px',
                        }}
                    >
                        Email
                    </label>
                    <input
                        className="login-input"
                        placeholder="correo@ejemplo.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        style={{
                            width: '100%',
                            background: 'var(--bg-surface)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: 'var(--radius-md)',
                            padding: '12px 16px',
                            color: 'var(--text-primary)',
                            fontSize: '0.9375rem',
                            outline: 'none',
                            transition: 'border-color 0.25s, box-shadow 0.25s',
                            boxSizing: 'border-box',
                            fontFamily: "'Inter', sans-serif",
                        }}
                    />
                </div>

                {/* Password field */}
                <div style={{ marginBottom: '20px' }}>
                    <label
                        style={{
                            display: 'block',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            color: 'var(--text-secondary)',
                            marginBottom: '6px',
                        }}
                    >
                        Contraseña
                    </label>
                    <input
                        className="login-input"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        style={{
                            width: '100%',
                            background: 'var(--bg-surface)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: 'var(--radius-md)',
                            padding: '12px 16px',
                            color: 'var(--text-primary)',
                            fontSize: '0.9375rem',
                            outline: 'none',
                            transition: 'border-color 0.25s, box-shadow 0.25s',
                            boxSizing: 'border-box',
                            fontFamily: "'Inter', sans-serif",
                        }}
                    />
                </div>

                {/* Error message */}
                {error && (
                    <div
                        style={{
                            background: 'rgba(239, 68, 68, 0.08)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            borderRadius: 'var(--radius-md)',
                            padding: '12px 16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            animation: 'slideDown 0.3s var(--ease-out)',
                            marginBottom: '4px',
                        }}
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--danger)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ flexShrink: 0 }}
                        >
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                            <line x1="12" y1="9" x2="12" y2="13" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        <span
                            style={{
                                color: 'var(--danger)',
                                fontSize: '0.875rem',
                                lineHeight: 1.4,
                            }}
                        >
                            {error}
                        </span>
                    </div>
                )}

                {/* Submit button */}
                <button
                    type="submit"
                    className="login-btn"
                    style={{
                        width: '100%',
                        padding: '14px',
                        background: 'linear-gradient(135deg, var(--accent-start), var(--accent-mid), var(--accent-end))',
                        backgroundSize: '200% 200%',
                        animation: 'gradient-shift 3s ease infinite',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.9375rem',
                        border: 'none',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        marginTop: '28px',
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: '0.01em',
                    }}
                >
                    Ingresar
                </button>

                {/* Footer text */}
                <p
                    style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.75rem',
                        textAlign: 'center',
                        marginTop: '24px',
                        marginBottom: 0,
                        lineHeight: 1.5,
                    }}
                >
                    Matrices
                </p>
            </form>
        </div>
    );
}