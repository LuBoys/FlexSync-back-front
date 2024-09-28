'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"


const steps = [
  { id: 1, name: 'Informations personnelles' },
  { id: 2, name: 'Localisation' },
  { id: 3, name: 'Profil professionnel' },
  { id: 4, name: 'Invitation des élèves' },
]

export default function CoachSignUp() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    villeActivite: '',
    clubPartenaire: '',
    specialite: '',
    experience: '',
    certifications: '',
    descriptionCoaching: '',
  })
  const [invitationMethod, setInvitationMethod] = useState('link')
  const [invitationEmail, setInvitationEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length))
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simuler l'envoi des données à une API
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('Données du formulaire:', formData)
    setIsLoading(false)
    // Rediriger vers le tableau de bord après l'inscription
    router.push('/dashboard')
  }

  const handleInvite = async () => {
    setIsLoading(true)
    // Simuler l'envoi d'une invitation
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('Invitation envoyée à:', invitationEmail)
    setIsLoading(false)
    setInvitationEmail('')
  }

  return (
    <div className="flex items-center justify-center h-screen">
    <div className="w-full max-w-2xl space-y-8 p-8 bg-white rounded-xl shadow-lg">
      <Card>
        <CardHeader>
          <CardTitle>Inscription Coach</CardTitle>
          <CardDescription>Étape {currentStep} sur {steps.length}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="prenom" className="text-sm font-medium text-gray-900">
                      Prénom
                    </Label>
                    <Input
                      id="prenom"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nom" className="text-sm font-medium text-gray-900">
                      Nom
                    </Label>
                    <Input
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-900">
                    Adresse email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telephone" className="text-sm font-medium text-gray-900">
                    Numéro de téléphone
                  </Label>
                  <Input
                    id="telephone"
                    name="telephone"
                    type="tel"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="adresse">Adresse</Label>
                  <Input id="adresse" name="adresse" value={formData.adresse} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="villeActivite">Ville d&apos;activité</Label>
                  <Input id="villeActivite" name="villeActivite" value={formData.villeActivite} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clubPartenaire">Club partenaire (optionnel)</Label>
                  <Input id="clubPartenaire" name="clubPartenaire" value={formData.clubPartenaire} onChange={handleInputChange} />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="specialite">Spécialité/Type de coaching</Label>
                  <Select name="specialite" onValueChange={(value) => handleSelectChange('specialite', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez votre spécialité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fitness">Fitness</SelectItem>
                      <SelectItem value="nutrition">Nutrition</SelectItem>
                      <SelectItem value="yoga">Yoga</SelectItem>
                      <SelectItem value="crossfit">CrossFit</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Expérience professionnelle</Label>
                  <Textarea id="experience" name="experience" value={formData.experience} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certifications">Certifications et qualifications</Label>
                  <Textarea id="certifications" name="certifications" value={formData.certifications} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="descriptionCoaching">Description du coaching</Label>
                  <Textarea id="descriptionCoaching" name="descriptionCoaching" value={formData.descriptionCoaching} onChange={handleInputChange} required />
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Méthode d&apos;invitation des élèves</Label>
                  <Select value={invitationMethod} onValueChange={setInvitationMethod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="link">Lien d&apos;invitation</SelectItem>
                      <SelectItem value="email">Invitation par email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {invitationMethod === 'link' ? (
                  <div className="space-y-2">
                    <Label>Lien d&apos;invitation</Label>
                    <div className="flex items-center space-x-2">
                      <Input value="https://flexsync.com/invite/coach123" readOnly />
                      <Button type="button" variant="outline" onClick={() => navigator.clipboard.writeText('https://flexsync.com/invite/coach123')}>
                        Copier
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="invitationEmail">Email de l&apos;élève</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="invitationEmail"
                        type="email"
                        value={invitationEmail}
                        onChange={(e) => setInvitationEmail(e.target.value)}
                        placeholder="eleve@example.com"
                      />
                      <Button type="button" onClick={handleInvite} disabled={isLoading}>
                      {isLoading ? 'Chargement...' : 'Inviter'}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </form>
          </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 ease-in-out"
          >
            Précédent
          </Button>
          {currentStep < steps.length ? (
            <Button
              type="button"
              onClick={handleNext}
              className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 ease-in-out"
            >
              Suivant
            </Button>
          ) : (
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 ease-in-out"
            >
              Terminer l&apos;inscription
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  </div>
  )
}