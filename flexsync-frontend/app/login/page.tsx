'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState('client')
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    { id: 1, text: "FlexSync a transformé ma façon de m'entraîner ! L'interface est intuitive et les fonctionnalités sont exactement ce dont j'avais besoin pour suivre mes progrès.", author: "Marie L.", avatar: "/marie-l-avatar.jpg", rating: 5 },
    { id: 2, text: "En tant que coach, je peux facilement suivre les progrès de mes clients. C'est un outil indispensable pour mon travail quotidien.", author: "Thomas D.", avatar: "/thomas-d-avatar.jpg", rating: 4 },
    { id: 3, text: "Une plateforme complète qui répond à tous mes besoins en tant que sportif. La communication avec mon coach n'a jamais été aussi facile.", author: "Sophie M.", avatar: "/sophie-m-avatar.jpg", rating: 5 },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
    ))
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#9548E2] text-white p-24 flex-col justify-between ">
        <div className="space-y-6 ">
          <h1 className="text-4xl font-extrabold text-6xl">Bienvenue sur FlexSync</h1>
          <p className="text-x leading-7 text-xl font-normal text-[#CBD5E1]">
          Transformez votre coaching avec l’application tout-en-un : gérez abonnements, paiements, programmes et nutrition, tout en restant connecté à vos clients via notifications et chat, le tout sans effort.
          </p>
        </div>
        <div className="space-y-6 mb-16">
          <Card className="bg-[#9548E2] transition-all duration-500 ease-in-out border-none shadow-none">
            <CardContent className="p-0 space-y-4 text-white">
              <div className="flex">
                {renderStars(testimonials[currentTestimonial].rating)}
              </div>
              <p className="text-lg italic">&quot;{testimonials[currentTestimonial].text}&quot;</p>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={testimonials[currentTestimonial].avatar} alt={testimonials[currentTestimonial].author} />
                  <AvatarFallback>{testimonials[currentTestimonial].author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <span className="font-semibold">{testimonials[currentTestimonial].author}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 p-8 flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md space-y-8">
        <div className="w-full max-w-2xl space-y-10  p-8 bg-white rounded-xl shadow-lg">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Connexion</h2>
            <p className="text-sm text-gray-600 mt-2">Entrez vos identifiants pour accéder à votre espace</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
          <RadioGroup
  value={userType}
  onValueChange={setUserType}
  className="flex justify-center space-x-4"
>
  <div className="group flex items-center space-x-2">
    <div className="relative">
      <RadioGroupItem
        value="client"
        id="client"
        className="absolute opacity-0"
      />
      <div
        onClick={() => setUserType('client')}
        className="w-32 h-12 bg-gray-50 border-2 border-violet-500 group-hover:border-violet-700 transition-all duration-300 ease-in-out rounded-md flex justify-between items-center px-4 cursor-pointer"
      >
        <div className="w-4 h-4 border-2 border-violet-500 rounded-full flex justify-center items-center">
          <div
            className={`w-2 h-2 rounded-full ${
              userType === "client" ? "bg-violet-500" : "bg-transparent"
            }`}
          />
        </div>
        <Label htmlFor="client" className="text-[#9548E2]">Client</Label>
      </div>
    </div>
  </div>
  <div className="group flex items-center space-x-2">
    <div className="relative">
      <RadioGroupItem
        value="coach"
        id="coach"
        className="absolute opacity-0"
      />
      <div
        onClick={() => setUserType('coach')}
        className="w-32 h-12 bg-gray-50 border-2 border-violet-500 group-hover:border-violet-700 transition-all duration-300 ease-in-out rounded-md flex justify-between items-center px-4 cursor-pointer"
      >
        <div className="w-4 h-4 border-2 border-violet-500 rounded-full flex justify-center items-center">
          <div
            className={`w-2 h-2 rounded-full ${
              userType === "coach" ? "bg-violet-500" : "bg-transparent"
            }`}
          />
        </div>
        <Label htmlFor="coach" className="text-[#9548E2]">Coach</Label>
      </div>
    </div>
  </div>
</RadioGroup>

            <div className="space-y-2 text-gray-900">
              <Label htmlFor="email">Adresse e-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="johndoe@exemple.com"
                required
              />
            </div>

            <div className="space-y-2 text-gray-900">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="ml-2 text-sm text-gray-900">Se souvenir de moi</Label>
              </div>
              <a href="/forgot-password" className="text-sm text-violet-600 hover:underline">
                Mot de passe oublié ?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#9548E2] hover:bg-violet-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Chargement...' : 'Se connecter'}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full text-gray-900 hover:bg-[#9548E2] hover:text-white"
              onClick={() => console.log('Google login')}
            >
              Se connecter avec Google
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Vous n&apos;avez pas de compte ?{' '}
              <a href="/register" className="text-violet-600 hover:underline">
                Inscrivez-vous
              </a>
            </p>
          </div>
        </div>        
        </div>
      </div>
    </div>
  )
}