export interface WheelOption {
  id: string
  option: string
  /** Si es true, al salir esta opción no se celebra como premio. */
  isLose?: boolean
}

export interface WheelColors {
  backgroundColor: string
  textColor: string
  secondaryBackgroundColor: string
}

export interface WheelBranding {
  spinButtonText: string
  winnerMessage: string
  loseMessage: string
}

export interface WheelConfig {
  options: WheelOption[]
  colors: WheelColors
  branding: WheelBranding
}
