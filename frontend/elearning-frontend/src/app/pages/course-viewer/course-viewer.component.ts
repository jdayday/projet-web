import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RateCourseComponent } from '../../components/rate-course/rate-course.component';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-viewer',
  standalone: true,
  imports: [CommonModule,RateCourseComponent],
  templateUrl: './course-viewer.component.html',
  styleUrls: ['./course-viewer.component.scss']
})
export class CourseViewerComponent implements OnInit {
  courseContent: any;
  selectedLesson: any;
  safeVideoUrl: SafeResourceUrl | null = null;
  private currentLessonIndex = -1;
  private lessons: any[] = [];
  course: Course | null = null;
  courseId: number | null = null;
  isLoading = true;
  isEnrolled = false;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private sanitizer: DomSanitizer
  ) {
      this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));
  }

  ngOnInit(): void {

    if (this.courseId) {
      this.courseService.getCourseContent(this.courseId).subscribe({
        next: (data) => {
          this.courseContent = data;
          this.initializeLessons();
          if (this.lessons.length > 0) {
            this.selectLesson(this.lessons[0]);
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Failed to load course content', err);
          this.isLoading = false;
        }
      });

      this.courseService.checkEnrollment(this.courseId).subscribe({
        next: (response) => {
          this.isEnrolled = response.isEnrolled;
          console.log('Enrollment status:', this.isEnrolled);
        },
        error: (err) => {
          console.error('Failed to check enrollment status', err);
          this.isEnrolled = false; 
        }
      });
    }
  }

  private initializeLessons(): void {
    this.lessons = [];
    if (this.courseContent && this.courseContent.chapters) {
      this.courseContent.chapters.forEach((chapter: any) => {
        if (chapter.lessons) {
          chapter.lessons.forEach((lesson: any) => {
            lesson.completed = false; 
            this.lessons.push(lesson);
          });
        }
      });
    }
  }

  selectLesson(lesson: any) {
    this.selectedLesson = lesson;
    this.currentLessonIndex = this.lessons.findIndex(l => l === lesson);
    
    if (lesson.videoUrl) {
      const vimeoUrl = `https://player.vimeo.com/video/${lesson.videoUrl}`;
      this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(vimeoUrl);
    } else {
      this.safeVideoUrl = null;
    }
  }

  toggleLessonCompletion(lesson: any) {
    lesson.completed = !lesson.completed;
  }

  previousLesson() {
    if (this.currentLessonIndex > 0) {
      this.selectLesson(this.lessons[this.currentLessonIndex - 1]);
    }
  }

  nextLesson() {
    if (this.currentLessonIndex < this.lessons.length - 1) {
      this.selectLesson(this.lessons[this.currentLessonIndex + 1]);
    }
  }

  isFirstLesson(): boolean {
    return this.currentLessonIndex === 0;
  }

  isLastLesson(): boolean {
    return this.currentLessonIndex === this.lessons.length - 1;
  }

  markAsComplete(lessonId: number): void {
  this.courseService.markLessonAsComplete(lessonId).subscribe({
    next: (response) => {
      console.log(`Progress is now ${response.progress * 100}%`);
    },
    error: (err) => console.error('Failed to mark lesson as complete', err)
  });

 }

   onRatingSubmitted(updatedCourse: Course): void {
    if (this.courseContent) {
      this.courseContent.rating = updatedCourse.rating;
      this.courseContent.ratingCount = updatedCourse.ratingCount;
    }
  }

}