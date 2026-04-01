'use client'

import { useState, useRef, type ChangeEvent, type FormEvent } from 'react'
import {
  CheckCircle,
  Upload,
  ChevronLeft,
  ChevronRight,
  Loader2,
  X,
  Camera,
  Package,
  FileText,
  ClipboardList,
  ShieldCheck,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface FormData {
  // Step 1
  numero_pedido: string
  email: string
  cpf: string
  telefone: string
  codigo_rastreio: string
  data_recebimento: string
  // Step 2
  foto_produtos_url: string
  comprovante_entrega_url: string
  // Step 3
  foto_embalagens_url: string
  selfie_produto_url: string
  // Step 4
  dias_uso: string
  capsulas_por_dia: string
  horario: string
  liquido: string
  alimentacao: string
  efeitos: string[]
  efeitos_texto: string
  motivo_insatisfacao: string
  // Step 5
  declaracao1: boolean
  declaracao2: boolean
  declaracao3: boolean
  declaracao4: boolean
}

const INITIAL_FORM: FormData = {
  numero_pedido: '',
  email: '',
  cpf: '',
  telefone: '',
  codigo_rastreio: '',
  data_recebimento: '',
  foto_produtos_url: '',
  comprovante_entrega_url: '',
  foto_embalagens_url: '',
  selfie_produto_url: '',
  dias_uso: '',
  capsulas_por_dia: '',
  horario: '',
  liquido: '',
  alimentacao: '',
  efeitos: [],
  efeitos_texto: '',
  motivo_insatisfacao: '',
  declaracao1: false,
  declaracao2: false,
  declaracao3: false,
  declaracao4: false,
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function maskCPF(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`
  if (digits.length <= 9)
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`
}

function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits.length ? `(${digits}` : ''
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function daysBetween(dateStr: string): number {
  const date = new Date(dateStr + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + 'T00:00:00')
  d.setDate(d.getDate() + days)
  return d.toLocaleDateString('pt-BR')
}

/* ------------------------------------------------------------------ */
/*  Upload Component                                                   */
/* ------------------------------------------------------------------ */

function ImageUpload({
  label,
  instruction,
  value,
  onChange,
  error,
}: {
  label: string
  instruction: string
  value: string
  onChange: (url: string) => void
  error?: string
}) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(value || null)
  const [uploadError, setUploadError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) {
      setUploadError('Formato aceito: JPG ou PNG.')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Arquivo muito grande. Tamanho maximo: 10MB.')
      return
    }

    setUploadError('')
    setUploading(true)

    const localPreview = URL.createObjectURL(file)
    setPreview(localPreview)

    try {
      const fd = new window.FormData()
      fd.append('file', file)
      const res = await fetch('/api/reembolso/upload', { method: 'POST', body: fd })
      if (!res.ok) throw new Error('Upload falhou')
      const data = await res.json()
      onChange(data.url)
    } catch {
      setUploadError('Erro ao enviar imagem. Tente novamente.')
      setPreview(null)
      onChange('')
    } finally {
      setUploading(false)
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  function removeImage() {
    setPreview(null)
    onChange('')
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      <p className="text-xs text-gray-500">{instruction}</p>

      {preview ? (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="Preview"
            className="h-32 w-32 rounded-lg object-cover border border-gray-200"
          />
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
              <Loader2 className="h-6 w-6 animate-spin text-white" />
            </div>
          )}
          {!uploading && (
            <button
              type="button"
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      ) : (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer
                     hover:border-[#2ec6a8] hover:bg-gray-50 transition-colors"
        >
          <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">
            Clique para enviar ou arraste a imagem aqui
          </p>
          <p className="text-xs text-gray-400 mt-1">JPG ou PNG, max 10MB</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png"
        className="hidden"
        onChange={handleChange}
      />
      {(uploadError || error) && (
        <p className="text-sm text-red-600">{uploadError || error}</p>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Step Icons                                                         */
/* ------------------------------------------------------------------ */

const STEP_ICONS = [FileText, Package, Camera, ClipboardList, ShieldCheck]
const STEP_LABELS = [
  'Dados do Pedido',
  'Comprovacao de Recebimento',
  'Comprovacao de Uso',
  'Questionario Detalhado',
  'Declaracoes e Envio',
]

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */

export default function ReembolsoPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [protocol, setProtocol] = useState('')
  const [submitted, setSubmitted] = useState(false)

  /* ---- field updaters ---- */

  function updateField(field: keyof FormData, value: string | boolean | string[]) {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  function toggleEfeito(val: string) {
    setFormData((prev) => {
      const current = prev.efeitos
      const next = current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val]
      return { ...prev, efeitos: next }
    })
    setErrors((prev) => {
      const next = { ...prev }
      delete next.efeitos
      return next
    })
  }

  /* ---- validators per step ---- */

  function validateStep1(): boolean {
    const e: Record<string, string> = {}
    if (!formData.numero_pedido.trim()) e.numero_pedido = 'Informe o numero do pedido.'
    if (!formData.email.trim()) e.email = 'Informe o e-mail.'
    else if (!isValidEmail(formData.email)) e.email = 'E-mail invalido.'
    if (formData.cpf.replace(/\D/g, '').length !== 11) e.cpf = 'CPF deve ter 11 digitos.'
    if (formData.telefone.replace(/\D/g, '').length < 10)
      e.telefone = 'Telefone invalido.'
    if (!formData.codigo_rastreio.trim())
      e.codigo_rastreio = 'Informe o codigo de rastreio.'
    if (!formData.data_recebimento) {
      e.data_recebimento = 'Informe a data de recebimento.'
    } else {
      const days = daysBetween(formData.data_recebimento)
      if (days < 30) {
        e.data_recebimento =
          'A garantia exige uso minimo de 30 dias do produto. De acordo com a data informada, voce ainda nao atingiu esse prazo. Por favor, continue utilizando o produto conforme as instrucoes e retorne apos completar 30 dias de uso.'
      } else if (days > 60) {
        const expiry = addDays(formData.data_recebimento, 60)
        e.data_recebimento = `O prazo da garantia de 60 dias ja expirou. De acordo com a data informada, sua garantia encerrou em ${expiry}. Infelizmente nao e possivel solicitar reembolso apos esse prazo.`
      }
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function validateStep2(): boolean {
    const e: Record<string, string> = {}
    if (!formData.foto_produtos_url) e.foto_produtos_url = 'Envie a foto dos produtos.'
    if (!formData.comprovante_entrega_url)
      e.comprovante_entrega_url = 'Envie o comprovante de entrega.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function validateStep3(): boolean {
    const e: Record<string, string> = {}
    if (!formData.foto_embalagens_url)
      e.foto_embalagens_url = 'Envie a foto das embalagens.'
    if (!formData.selfie_produto_url)
      e.selfie_produto_url = 'Envie a selfie com o produto.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function validateStep4(): boolean {
    const e: Record<string, string> = {}
    if (!formData.dias_uso) {
      e.dias_uso = 'Informe os dias de uso.'
    } else if (parseInt(formData.dias_uso) < 30) {
      e.dias_uso = 'O uso minimo para solicitar reembolso e de 30 dias.'
    }
    if (!formData.capsulas_por_dia.trim())
      e.capsulas_por_dia = 'Preencha este campo.'
    if (!formData.horario.trim()) e.horario = 'Preencha este campo.'
    if (!formData.liquido.trim()) e.liquido = 'Preencha este campo.'
    if (!formData.alimentacao.trim()) e.alimentacao = 'Preencha este campo.'
    if (!formData.efeitos_texto?.trim()) e.efeitos = 'Descreva os efeitos que sentiu.'
    if (formData.motivo_insatisfacao.length < 200)
      e.motivo_insatisfacao = `Descreva com mais detalhes (minimo 200 caracteres). Faltam ${200 - formData.motivo_insatisfacao.length} caracteres.`
    setErrors(e)
    return Object.keys(e).length === 0
  }

  /* ---- navigation ---- */

  function next() {
    let valid = false
    if (step === 1) valid = validateStep1()
    else if (step === 2) valid = validateStep2()
    else if (step === 3) valid = validateStep3()
    else if (step === 4) valid = validateStep4()
    if (valid) {
      setStep((s) => s + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function prev() {
    setErrors({})
    setStep((s) => s - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /* ---- submit ---- */

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (
      !formData.declaracao1 ||
      !formData.declaracao2 ||
      !formData.declaracao3 ||
      !formData.declaracao4
    )
      return

    setSubmitting(true)
    try {
      const res = await fetch('/api/reembolso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error('Erro ao enviar')
      const data = await res.json()
      setProtocol(data.protocol || data.protocolo || 'N/A')
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setErrors({ submit: 'Erro ao enviar solicitacao. Tente novamente.' })
    } finally {
      setSubmitting(false)
    }
  }

  /* ================================================================ */
  /*  RENDER                                                           */
  /* ================================================================ */

  /* ---- Confirmation Screen ---- */
  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-[#2ec6a8]" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Solicitacao Enviada com Sucesso!
          </h1>
          <div className="bg-gray-50 rounded-xl p-6 space-y-2">
            <p className="text-sm text-gray-500">Numero do protocolo</p>
            <p className="text-2xl font-bold text-[#2ec6a8] tracking-wider">
              {protocol}
            </p>
          </div>
          <div className="text-left bg-gray-50 rounded-xl p-6 space-y-3 text-sm text-gray-600">
            <p className="font-semibold text-gray-800">Proximos passos:</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Sua solicitacao sera analisada em ate 7 dias uteis.</li>
              <li>Voce recebera uma resposta no e-mail informado.</li>
              <li>
                Caso aprovado, o reembolso sera processado em ate 10 dias uteis
                apos a aprovacao.
              </li>
            </ol>
            <p className="text-xs text-gray-400 mt-4">
              Guarde o numero do protocolo para acompanhamento.
            </p>
          </div>
          <a
            href="/"
            className="inline-block w-full py-3 px-6 bg-[#2ec6a8] text-white font-semibold rounded-lg
                       hover:bg-[#26a98e] transition-colors text-center"
          >
            Voltar para o site
          </a>
        </div>
      </div>
    )
  }

  /* ---- Progress Bar ---- */
  const progressPercent = (step / 5) * 100

  /* ---- Shared input class ---- */
  const inputClass =
    'border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#2ec6a8] focus:border-transparent transition-colors'
  const errorInputClass =
    'border border-red-400 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent'

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Solicitacao de Reembolso</h1>
          <p className="text-sm text-gray-500 mt-1">Garantia Desparafit - 60 dias</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Etapa {step} de 5
            </span>
            <span className="text-sm text-gray-400">{STEP_LABELS[step - 1]}</span>
          </div>
          <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2ec6a8] rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          {/* Step dots */}
          <div className="flex justify-between mt-3">
            {STEP_ICONS.map((Icon, i) => (
              <div
                key={i}
                className={`flex flex-col items-center gap-1 ${
                  i + 1 <= step ? 'text-[#2ec6a8]' : 'text-gray-300'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                    ${
                      i + 1 < step
                        ? 'bg-[#2ec6a8] text-white'
                        : i + 1 === step
                          ? 'bg-[#2ec6a8]/10 text-[#2ec6a8] ring-2 ring-[#2ec6a8]'
                          : 'bg-gray-100 text-gray-400'
                    }`}
                >
                  {i + 1 < step ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ========== STEP 1 ========== */}
          {step === 1 && (
            <div className="bg-gray-50 rounded-xl p-6 space-y-5">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#2ec6a8]" />
                Dados do Pedido
              </h2>

              {/* Numero do pedido */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Numero do pedido <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: #12345"
                  value={formData.numero_pedido}
                  onChange={(e) => updateField('numero_pedido', e.target.value)}
                  className={errors.numero_pedido ? errorInputClass : inputClass}
                />
                {errors.numero_pedido && (
                  <p className="text-sm text-red-600 mt-1">{errors.numero_pedido}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  E-mail usado na compra <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className={errors.email ? errorInputClass : inputClass}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                )}
              </div>

              {/* CPF */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  CPF do titular <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                  onChange={(e) => updateField('cpf', maskCPF(e.target.value))}
                  className={errors.cpf ? errorInputClass : inputClass}
                />
                {errors.cpf && (
                  <p className="text-sm text-red-600 mt-1">{errors.cpf}</p>
                )}
              </div>

              {/* Telefone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Telefone / WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={formData.telefone}
                  onChange={(e) => updateField('telefone', maskPhone(e.target.value))}
                  className={errors.telefone ? errorInputClass : inputClass}
                />
                {errors.telefone && (
                  <p className="text-sm text-red-600 mt-1">{errors.telefone}</p>
                )}
              </div>

              {/* Codigo rastreio */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Codigo de rastreio <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: BR123456789XX"
                  value={formData.codigo_rastreio}
                  onChange={(e) => updateField('codigo_rastreio', e.target.value)}
                  className={errors.codigo_rastreio ? errorInputClass : inputClass}
                />
                {errors.codigo_rastreio && (
                  <p className="text-sm text-red-600 mt-1">{errors.codigo_rastreio}</p>
                )}
              </div>

              {/* Data recebimento */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Data que recebeu os produtos <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.data_recebimento}
                  onChange={(e) => updateField('data_recebimento', e.target.value)}
                  className={errors.data_recebimento ? errorInputClass : inputClass}
                />
                {errors.data_recebimento && (
                  <p className="text-sm text-red-600 mt-1">{errors.data_recebimento}</p>
                )}
              </div>
            </div>
          )}

          {/* ========== STEP 2 ========== */}
          {step === 2 && (
            <div className="bg-gray-50 rounded-xl p-6 space-y-6">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Package className="h-5 w-5 text-[#2ec6a8]" />
                Comprovacao de Recebimento
              </h2>

              <ImageUpload
                label="Foto dos produtos recebidos"
                instruction="Tire uma foto de TODOS os produtos que voce recebeu neste pedido. Os produtos devem estar visiveis e identificaveis na imagem."
                value={formData.foto_produtos_url}
                onChange={(url) => updateField('foto_produtos_url', url)}
                error={errors.foto_produtos_url}
              />

              <ImageUpload
                label="Comprovante de entrega"
                instruction="Envie um print/screenshot do rastreio mostrando que a entrega foi realizada. Pode ser do site dos Correios ou da transportadora."
                value={formData.comprovante_entrega_url}
                onChange={(url) => updateField('comprovante_entrega_url', url)}
                error={errors.comprovante_entrega_url}
              />
            </div>
          )}

          {/* ========== STEP 3 ========== */}
          {step === 3 && (
            <div className="bg-gray-50 rounded-xl p-6 space-y-6">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Camera className="h-5 w-5 text-[#2ec6a8]" />
                Comprovacao de Uso
              </h2>

              <ImageUpload
                label="Foto das embalagens abertas"
                instruction="Envie uma foto mostrando as embalagens abertas/utilizadas do Desparafit. As embalagens devem estar visiveis, evidenciando que foram abertas e o produto foi consumido."
                value={formData.foto_embalagens_url}
                onChange={(url) => updateField('foto_embalagens_url', url)}
                error={errors.foto_embalagens_url}
              />

              <ImageUpload
                label="Selfie com o produto"
                instruction="Tire uma selfie segurando o produto Desparafit. A foto deve mostrar seu rosto e o produto claramente. Inclua a data atual visivel em um dispositivo (celular, TV, computador) ao fundo."
                value={formData.selfie_produto_url}
                onChange={(url) => updateField('selfie_produto_url', url)}
                error={errors.selfie_produto_url}
              />
            </div>
          )}

          {/* ========== STEP 4 ========== */}
          {step === 4 && (
            <div className="bg-gray-50 rounded-xl p-6 space-y-6">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-[#2ec6a8]" />
                Questionario Detalhado
              </h2>

              {/* Dias de uso */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Por quantos dias voce utilizou o Desparafit?{' '}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min={1}
                  placeholder="Ex: 30"
                  value={formData.dias_uso}
                  onChange={(e) => updateField('dias_uso', e.target.value)}
                  className={errors.dias_uso ? errorInputClass : inputClass}
                />
                {errors.dias_uso && (
                  <p className="text-sm text-red-600 mt-1">{errors.dias_uso}</p>
                )}
              </div>

              {/* Capsulas por dia */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Quantas cápsulas você tomava por dia?{' '}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: 2 cápsulas"
                  value={formData.capsulas_por_dia}
                  onChange={(e) => updateField('capsulas_por_dia', e.target.value)}
                  className={errors.capsulas_por_dia ? errorInputClass : inputClass}
                />
                {errors.capsulas_por_dia && (
                  <p className="text-sm text-red-600 mt-1">{errors.capsulas_por_dia}</p>
                )}
              </div>

              {/* Horario */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Em qual horário você geralmente tomava?{' '}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: Manhã antes do café da manhã"
                  value={formData.horario}
                  onChange={(e) => updateField('horario', e.target.value)}
                  className={errors.horario ? errorInputClass : inputClass}
                />
                {errors.horario && (
                  <p className="text-sm text-red-600 mt-1">{errors.horario}</p>
                )}
              </div>

              {/* Liquido */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Tomava as cápsulas com o quê?{' '}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: Água"
                  value={formData.liquido}
                  onChange={(e) => updateField('liquido', e.target.value)}
                  className={errors.liquido ? errorInputClass : inputClass}
                />
                {errors.liquido && (
                  <p className="text-sm text-red-600 mt-1">{errors.liquido}</p>
                )}
              </div>

              {/* Alimentacao */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Você fez alguma mudança na sua alimentação durante o uso?{' '}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: Sim, reduzi açúcar e carboidratos"
                  value={formData.alimentacao}
                  onChange={(e) => updateField('alimentacao', e.target.value)}
                  className={errors.alimentacao ? errorInputClass : inputClass}
                />
                {errors.alimentacao && (
                  <p className="text-sm text-red-600 mt-1">{errors.alimentacao}</p>
                )}
              </div>

              {/* Efeitos */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Quais efeitos você sentiu durante o uso?{' '}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Ex: Senti redução da fome, menos inchaço na barriga, intestino mais regulado..."
                  value={formData.efeitos_texto || ''}
                  onChange={(e) => updateField('efeitos_texto', e.target.value)}
                  className={errors.efeitos ? errorInputClass : inputClass}
                />
                {errors.efeitos && (
                  <p className="text-sm text-red-600 mt-1">{errors.efeitos}</p>
                )}
              </div>

              {/* Motivo insatisfacao */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Descreva detalhadamente o motivo da sua insatisfacao{' '}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={5}
                  placeholder="Conte-nos com detalhes por que o produto nao atendeu suas expectativas..."
                  value={formData.motivo_insatisfacao}
                  onChange={(e) => updateField('motivo_insatisfacao', e.target.value)}
                  className={errors.motivo_insatisfacao ? errorInputClass : inputClass}
                />
                <div className="flex justify-between mt-1">
                  {errors.motivo_insatisfacao && (
                    <p className="text-sm text-red-600">{errors.motivo_insatisfacao}</p>
                  )}
                  <p
                    className={`text-xs ml-auto ${
                      formData.motivo_insatisfacao.length >= 200
                        ? 'text-[#2ec6a8]'
                        : 'text-gray-400'
                    }`}
                  >
                    {formData.motivo_insatisfacao.length}/200 caracteres
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ========== STEP 5 ========== */}
          {step === 5 && (
            <div className="space-y-6">
              {/* Summary */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-[#2ec6a8]" />
                  Resumo da Solicitacao
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Pedido:</span>{' '}
                    <span className="font-medium text-gray-800">
                      {formData.numero_pedido}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">E-mail:</span>{' '}
                    <span className="font-medium text-gray-800">{formData.email}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">CPF:</span>{' '}
                    <span className="font-medium text-gray-800">{formData.cpf}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Data recebimento:</span>{' '}
                    <span className="font-medium text-gray-800">
                      {formData.data_recebimento
                        ? new Date(formData.data_recebimento + 'T00:00:00').toLocaleDateString(
                            'pt-BR'
                          )
                        : ''}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Dias de uso:</span>{' '}
                    <span className="font-medium text-gray-800">
                      {formData.dias_uso} dias
                    </span>
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-3 mt-4">
                  {[
                    { url: formData.foto_produtos_url, alt: 'Produtos' },
                    { url: formData.comprovante_entrega_url, alt: 'Entrega' },
                    { url: formData.foto_embalagens_url, alt: 'Embalagens' },
                    { url: formData.selfie_produto_url, alt: 'Selfie' },
                  ].map((img, i) => (
                    <div key={i} className="space-y-1">
                      <div className="aspect-square rounded-lg overflow-hidden bg-gray-200 border border-gray-200">
                        {img.url ? (
                          <img
                            src={img.url}
                            alt={img.alt}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Camera className="h-6 w-6" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-center text-gray-500">{img.alt}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Declarations */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <h3 className="text-base font-bold text-gray-800">Declaracoes</h3>

                {(
                  [
                    {
                      field: 'declaracao1' as const,
                      text: 'Declaro que utilizei o produto Desparafit por no minimo 30 dias consecutivos, conforme as instrucoes de uso recomendadas.',
                    },
                    {
                      field: 'declaracao2' as const,
                      text: 'Declaro que todas as informacoes fornecidas neste formulario sao verdadeiras e que as fotos enviadas sao autenticas e nao foram adulteradas.',
                    },
                    {
                      field: 'declaracao3' as const,
                      text: 'Estou ciente de que o fornecimento de informacoes falsas ou fotos adulteradas invalidara minha solicitacao de reembolso.',
                    },
                    {
                      field: 'declaracao4' as const,
                      text: 'Entendo que minha solicitacao sera analisada em ate 7 dias uteis e que receberei uma resposta no e-mail informado.',
                    },
                  ] as const
                ).map(({ field, text }) => (
                  <label
                    key={field}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors
                      ${
                        formData[field]
                          ? 'border-[#2ec6a8] bg-[#2ec6a8]/5'
                          : 'border-gray-200 bg-white'
                      }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData[field]}
                      onChange={(e) => updateField(field, e.target.checked)}
                      className="accent-[#2ec6a8] mt-0.5 h-4 w-4 shrink-0"
                    />
                    <span className="text-sm text-gray-700">{text}</span>
                  </label>
                ))}
              </div>

              {errors.submit && (
                <p className="text-sm text-red-600 text-center">{errors.submit}</p>
              )}
            </div>
          )}

          {/* ========== Navigation Buttons ========== */}
          <div className="flex gap-3 pt-2">
            {step > 1 && (
              <button
                type="button"
                onClick={prev}
                className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 font-semibold rounded-lg
                           hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Voltar
              </button>
            )}

            {step < 5 && (
              <button
                type="button"
                onClick={next}
                className="flex-1 py-3 px-6 bg-[#2ec6a8] text-white font-semibold rounded-lg
                           hover:bg-[#26a98e] transition-colors flex items-center justify-center gap-2"
              >
                Proxima Etapa
                <ChevronRight className="h-4 w-4" />
              </button>
            )}

            {step === 5 && (
              <button
                type="submit"
                disabled={
                  submitting ||
                  !formData.declaracao1 ||
                  !formData.declaracao2 ||
                  !formData.declaracao3 ||
                  !formData.declaracao4
                }
                className="flex-1 py-3 px-6 bg-[#2ec6a8] text-white font-semibold rounded-lg
                           hover:bg-[#26a98e] transition-colors flex items-center justify-center gap-2
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#2ec6a8]"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Enviar Solicitacao de Reembolso'
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
